import { useEffect, useState } from "react";

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/job", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (error) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply for jobs.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/labor/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Applied successfully!");
      } else {
        alert(data.message || "Failed to apply for job.");
      }
    } catch (error) {
      alert("An error occurred while applying for the job.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex flex-col items-center">
      <div className="pt-28 w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          All Jobs Posted by Clients
        </h1>
        <p className="mb-6 text-gray-500 text-center">
          Browse and apply to jobs posted by registered clients.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">No jobs found.</p>
          </div>
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 border-l-4 border-green-500 shadow-md rounded-lg transition-transform hover:scale-[1.02] text-center"
                >
                  <h2 className="text-xl font-semibold text-green-700 mb-2">
                    {job.title}
                  </h2>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Posted By (Client Phone):</strong> {job.postedBy}
                  </p>
                  <p>
                    <strong>Skill Required:</strong> {job.skill}
                  </p>
                  <p>
                    <strong>Number of Laborers:</strong> {job.numberOfLaborers}
                  </p>
                  <p className="mb-3">{job.description}</p>
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
