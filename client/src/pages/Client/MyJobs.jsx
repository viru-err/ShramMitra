import { useEffect, useState } from "react";
import axios from "axios";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const clientId = localStorage.getItem("clientId");
        if (!clientId) {
          setError("Client ID not found. Please log in again.");
          setLoading(false);
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/jobs/client/${clientId}`);
        setJobs(res.data?.jobs || []);
        setError("");
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Error fetching job list.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-green-600 mb-6">My Posted Jobs</h2>

      {loading ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">You have not posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-6 bg-white border-l-4 border-green-500 shadow rounded"
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
                <strong>Status:</strong> {job.status || "Open"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
