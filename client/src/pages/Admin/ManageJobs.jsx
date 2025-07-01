import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Manage Job Posts</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Skill</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Laborers Needed</th>
                <th className="border px-4 py-2">Posted On</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-100 transition-colors">
                  <td className="border px-4 py-2">{job.title}</td>
                  <td className="border px-4 py-2">{job.skill}</td>
                  <td className="border px-4 py-2">{job.location}</td>
                  <td className="border px-4 py-2">
                    {job.numberOfLaborers ?? <span className="italic text-gray-400">N/A</span>}
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
  );
}
