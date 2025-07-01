import { useEffect, useState } from "react";

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulate fetching jobs from backend
    const dummyJobs = [
      {
        id: 1,
        title: "Electrician Needed",
        location: "Patna",
        description: "Fix electrical issues in a new building",
        company: "XYZ Constructions",
      },
      {
        id: 2,
        title: "Plumber Required",
        location: "Ranchi",
        description: "Install and repair water pipelines",
        company: "AquaWorks Pvt Ltd",
      },
    ];

    setJobs(dummyJobs);
  }, []);

 const handleApply = async (jobId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to apply for jobs.");
      return;
    }

    // Optionally, get labor ID from your backend or decode from token if needed
    // For now, just send the jobId and let backend get labor from token

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
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Search Jobs
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-300 rounded-lg p-6 shadow bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
            <p className="text-gray-700 mb-3">{job.description}</p>
            <button
              onClick={() => handleApply(job.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
