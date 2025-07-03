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

    fetch("http://localhost:5000/api/labor/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLaborData(data.labor || null))
      .catch(() => {
        setLaborData(null);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 px-4 flex flex-col items-center">
      <div className="pt-28 w-full flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-8">
            <h1 className="text-4xl font-bold text-orange-700 drop-shadow-sm">
              👷 Labor Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow font-semibold transition"
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>

          {/* Welcome Card */}
          {laborData && (
            <div className="bg-white shadow-lg rounded-xl p-6 mb-10 border-l-4 border-orange-500 w-full">
              <h2 className="text-2xl font-semibold mb-3 text-gray-700">
                Welcome, {laborData.name} 👋
              </h2>
              <p className="mb-1"><strong>Phone:</strong> {laborData.phone}</p>
              <p className="mb-1"><strong>Skill:</strong> {laborData.skill}</p>
              <p className="mb-1"><strong>Location:</strong> {laborData.location}</p>
              <p><strong>Experience:</strong> {laborData.experience} year(s)</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <button
              onClick={() => navigate("/labor/job-search")}
              className="bg-yellow-500 text-white py-8 rounded-xl shadow-md font-bold text-lg hover:bg-yellow-600 transition"
            >
              🔍 Search Jobs
            </button>
            <button
              onClick={() => navigate("/labor/applications")}
              className="bg-orange-500 text-white py-8 rounded-xl shadow-md font-bold text-lg hover:bg-orange-600 transition"
            >
              📄 View Applications
            </button>
            <button
              onClick={() => navigate("/labor/profile")}
              className="bg-green-600 text-white py-8 rounded-xl shadow-md font-bold text-lg hover:bg-green-700 transition"
            >
              ⚙️ Manage Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
