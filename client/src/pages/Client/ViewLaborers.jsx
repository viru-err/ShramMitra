import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewLaborers() {
  const [laborers, setLaborers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaborers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/labor");
        // Support both { laborers: [...] } and [...] response
        setLaborers(res.data?.laborers || res.data || []);
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
      <h2 className="text-3xl font-bold text-green-600 mb-6">Browse Laborers</h2>

      {loading ? (
        <p className="text-gray-600">Loading laborers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : laborers.length === 0 ? (
        <p className="text-gray-500">No laborers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {laborers.map((labor) => (
            <div
              key={labor._id}
              className="bg-white p-6 border-l-4 border-yellow-500 shadow rounded transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold text-orange-600 mb-2">{labor.name}</h3>
              <p>
                <strong>Phone:</strong> {labor.phone}
              </p>
              <p>
                <strong>Skill:</strong> {labor.skill}
              </p>
              <p>
                <strong>Location:</strong> {labor.location}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {labor.experience !== undefined && labor.experience !== null
                  ? `${labor.experience} year${labor.experience === 1 ? "" : "s"}`
                  : <span className="italic text-gray-400">N/A</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
