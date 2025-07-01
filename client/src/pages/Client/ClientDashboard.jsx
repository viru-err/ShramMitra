import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClientDashboard() {
  const [clientData, setClientData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (role !== "client" || !token) {
      navigate("/login");
      return;
    }

    // Fetch client details from backend (correct endpoint)
    axios
      .get("http://localhost:5000/api/client/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClientData(res.data.client))
      .catch(() => {
        setClientData(null);
        navigate("/login");
      });
  }, [navigate]);

  if (!clientData) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-green-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Welcome, {clientData.name}!
      </h1>

      <p className="text-gray-700 mb-2">
        <strong>Company:</strong> {clientData.company}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Phone:</strong> {clientData.phone}
      </p>
      <p className="text-gray-700 mb-6">
        <strong>Location:</strong> {clientData.location}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/post-job")}
          className="bg-green-500 hover:bg-green-600 text-white p-8 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Post a New Job
        </button>

        <button
          onClick={() => navigate("/my-jobs")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-8 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          View My Jobs
        </button>

        <button
          onClick={() => navigate("/view-laborers")}
          className="bg-lime-500 hover:bg-lime-600 text-white p-8 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-300"
        >
          Browse Laborers
        </button>
      </div>
    </div>
  );
}
