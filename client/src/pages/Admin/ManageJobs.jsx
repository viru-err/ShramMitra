import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data?.jobs || []);
        setError("");
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white border-l-4 border-blue-500 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-blue-700 drop-shadow-sm">
            🗂️ Manage Job Posts
          </h2>
          <button
            onClick={() => navigate("/admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-medium transition"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-blue-700 text-lg">Loading jobs...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600 text-lg">No jobs found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow mt-4">
            <table className="w-full table-auto border-collapse border border-gray-300 bg-white text-sm">
              <thead>
                <tr className="bg-blue-100 text-gray-800 font-semibold">
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Skill</th>
                  <th className="border px-4 py-2 text-left">Location</th>
                  <th className="border px-4 py-2 text-left">Laborers Needed</th>
                  <th className="border px-4 py-2 text-left">Posted On</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition">
                    <td className="border px-4 py-2">{job.title}</td>
                    <td className="border px-4 py-2">{job.skill}</td>
                    <td className="border px-4 py-2">{job.location}</td>
                    <td className="border px-4 py-2">
                      {job.numberOfLaborers ?? (
                        <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : <span className="italic text-gray-400">N/A</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
