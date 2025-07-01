// src/pages/Labor/LaborDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LaborDashboard() {
  const [laborData, setLaborData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "labor") {
      navigate("/login");
      return;
    }

    // Example: Fetch user data from backend (optional for now)
    setLaborData({
      name: "Virukumar",
      phone: "7667812506",
      skills: ["Electrician", "Plumber"]
    });
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Labor Dashboard
      </h1>

      {laborData && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 border-l-4 border-orange-400">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Welcome, {laborData.name} 👷‍♂️
          </h2>
          <p>
            <strong>Phone:</strong> {laborData.phone}
          </p>
          <p>
            <strong>Skills:</strong> {laborData.skills.join(", ")}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/labor/job-search")}
          className="bg-yellow-500 text-white py-3 px-4 rounded shadow hover:bg-yellow-600 transition"
        >
          🔍 Search Jobs
        </button>
        <button
          onClick={() => navigate("/labor/applications")}
          className="bg-orange-500 text-white py-3 px-4 rounded shadow hover:bg-orange-600 transition"
        >
          📄 View Applications
        </button>
        <button
          onClick={() => navigate("/labor/profile")}
          className="bg-green-600 text-white py-3 px-4 rounded shadow hover:bg-green-700 transition"
        >
          ⚙️ Manage Profile
        </button>
      </div>
    </div>
  );
}
