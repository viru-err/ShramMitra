import { useEffect, useState } from "react";
import axios from "axios";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/client/my-jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data?.jobs || []);
        setError("");
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(
          err.response?.data?.message || "Error fetching job list."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex flex-col items-center">
      <div className="pt-28 w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          My Posted Jobs
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">You have not posted any jobs yet.</p>
          </div>
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 border-l-4 border-green-500 shadow-md rounded-lg transition-transform hover:scale-[1.02] text-center"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{job.title}</h3>
                  <p>
                    <strong>Skill Required:</strong> {job.skill}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Number of Laborers:</strong>{" "}
                    {job.numberOfLaborers ?? <span className="italic text-gray-400">N/A</span>}
                  </p>
                  <p>
                    <strong>Posted On:</strong>{" "}
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : <span className="italic text-gray-400">N/A</span>}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {job.status || (job.isActive === false ? "Closed" : "Open")}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.location.href = "/client/dashboard"}
              className="mt-10 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
