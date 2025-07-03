import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(res.data?.jobs || []);
        setError("");
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err.response?.data?.message || "Error fetching job list.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-green-700 drop-shadow-sm">
            📋 My Posted Jobs
          </h2>
          <button
            onClick={() => navigate("/client/dashboard")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow font-semibold transition"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg text-green-700 mt-10">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500 mt-10">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-10">
            You haven’t posted any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border-l-4 border-green-500 shadow-md rounded-xl p-6 hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">{job.title}</h3>
                <p><strong>Skill Required:</strong> {job.skill}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p>
                  <strong>Laborers:</strong>{" "}
                  {job.numberOfLaborers ?? <span className="italic text-gray-400">N/A</span>}
                </p>
                <p>
                  <strong>Posted:</strong>{" "}
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
        )}
      </div>
    </div>
  );
}
