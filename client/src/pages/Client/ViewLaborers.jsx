import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewLaborers() {
  const [laborers, setLaborers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaborers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in. Please log in as a client or admin.");
          setLoading(false);
          return;
        }
        const res = await axios.get("http://localhost:5000/api/labor/view-laborers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLaborers(res.data?.laborers || []);
        setError("");
      } catch (err) {
        console.error("Error fetching laborers:", err);
        setError(err.response?.data?.message || "Failed to load laborers.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaborers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex flex-col items-center">
      {/* Add extra top padding to prevent title from being hidden behind navbar */}
      <div className="pt-28 w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Browse Laborers
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-600 text-lg">Loading laborers...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : laborers.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">No laborers found.</p>
          </div>
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
              {laborers.map((labor) => (
                <div
                  key={labor._id}
                  className="bg-white p-6 border-l-4 border-yellow-500 shadow-md rounded-lg transition-transform hover:scale-[1.02] text-center"
                >
                  <h3 className="text-xl font-bold text-orange-600 mb-2">{labor.name}</h3>
                  <p><strong>Phone:</strong> {labor.phone}</p>
                  <p><strong>Skill:</strong> {labor.skill}</p>
                  <p><strong>Location:</strong> {labor.location}</p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {labor.experience !== undefined && labor.experience !== null
                      ? `${labor.experience} year${labor.experience === 1 ? "" : "s"}`
                      : <span className="italic text-gray-400">N/A</span>}
                  </p>
                </div>
              ))}
            </div>

            {/* Button below the cards */}
            <button
              onClick={() => navigate("/client/dashboard")}
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
