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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!clientData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <h1 className="text-2xl font-bold text-green-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-green-700 drop-shadow-sm">
            👋 Welcome, {clientData.name}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow font-semibold transition"
            title="Logout"
          >
            🚪 Logout
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10 border-l-4 border-green-500">
          <p className="text-gray-700 mb-2">
            <strong>Company:</strong> {clientData.company}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> {clientData.phone}
          </p>
          <p className="text-gray-700">
            <strong>Location:</strong> {clientData.location}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          <button
            onClick={() => navigate("/post-job")}
            className="bg-green-500 hover:bg-green-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition"
          >
            📝 Post a New Job
          </button>

          <button
            onClick={() => navigate("/my-jobs")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition"
          >
            📋 View My Jobs
          </button>

          <button
            onClick={() => navigate("/view-laborers")}
            className="bg-lime-500 hover:bg-lime-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition"
          >
            👷‍♂️ Browse Laborers
          </button>
        </div>
      </div>
    </div>
  );
}
