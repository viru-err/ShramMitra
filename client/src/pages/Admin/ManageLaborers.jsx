import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageLaborers() {
  const [laborers, setLaborers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaborers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/labor");
        setLaborers(res.data?.laborers || []);
        setError("");
      } catch (err) {
        console.error("Error fetching laborers:", err);
        setError("Failed to load laborers.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaborers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-yellow-700 mb-6">Manage Laborers</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : laborers.length === 0 ? (
        <p className="text-gray-500">No laborers found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Skill</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Experience</th>
              </tr>
            </thead>
            <tbody>
              {laborers.map((labor) => (
                <tr key={labor._id} className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 px-4 py-2">{labor.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{labor.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{labor.skill}</td>
                  <td className="border border-gray-300 px-4 py-2">{labor.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{labor.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
