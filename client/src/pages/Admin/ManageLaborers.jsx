import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageLaborers() {
  const [laborers, setLaborers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white border-l-4 border-yellow-500 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-yellow-700 drop-shadow-sm">
            👷 Manage Laborers
          </h2>
          <button
            onClick={() => navigate("/admin")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow font-medium transition"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-yellow-700 text-lg">Loading laborers...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : laborers.length === 0 ? (
          <p className="text-gray-600 text-lg">No laborers found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow mt-4">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white text-sm">
              <thead>
                <tr className="bg-yellow-100 text-gray-800 font-semibold">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Skill</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
                </tr>
              </thead>
              <tbody>
                {laborers.map((labor) => (
                  <tr key={labor._id} className="hover:bg-gray-50 transition">
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
    </div>
  );
}
