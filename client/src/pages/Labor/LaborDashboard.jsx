import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LaborDashboard() {
  const [laborData, setLaborData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "labor") {
      navigate("/login");
      return;
    }

    // Fetch labor profile
    fetch("http://localhost:5000/api/labor/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLaborData(data.labor || null))
      .catch(() => {
        setLaborData(null);
        navigate("/login");
      });

    // Fetch notifications
    fetchNotifications(token);
  }, [navigate]);

  const fetchNotifications = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/labor/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch {
      setNotifications([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex flex-col items-center">
      <div className="pt-28 w-full flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-8">
            <h1 className="text-3xl font-bold text-orange-600">Labor Dashboard</h1>
            <div className="relative">
              <button
                onClick={() => setNotifOpen((open) => !open)}
                className="relative bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition font-semibold"
                title="Notifications"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                    {notifications.length}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b font-bold text-gray-700 flex justify-between items-center">
                    Notifications
                    <button
                      className="text-xs text-gray-400 hover:text-red-500"
                      onClick={() => setNotifOpen(false)}
                    >
                      ✕
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-4 text-gray-500 text-center">No notifications</div>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div
                        key={notif._id || idx}
                        className="p-4 border-b last:border-b-0 text-sm"
                      >
                        <div className="font-semibold text-gray-800 mb-1">{notif.message}</div>

                        {/* Show extra client info if available */}
                        {notif.meta?.clientName && (
                          <div className="text-gray-600 text-sm mt-1">
                            👤 <strong>Client:</strong> {notif.meta.clientName}
                            <br />
                            📞 <strong>Phone:</strong> {notif.meta.clientPhone}
                            <br />
                            📍 <strong>Location:</strong> {notif.meta.clientLocation}
                          </div>
                        )}

                        <div className="text-gray-400 text-xs mt-1">
                          {notif.createdAt
                            ? new Date(notif.createdAt).toLocaleString()
                            : ""}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {laborData && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 border-l-4 border-orange-400 w-full">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Welcome, {laborData.name} 👷‍♂️
              </h2>
              <p><strong>Phone:</strong> {laborData.phone}</p>
              <p><strong>Skill:</strong> {laborData.skill}</p>
              <p><strong>Location:</strong> {laborData.location}</p>
              <p><strong>Experience:</strong> {laborData.experience} year(s)</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <button
              onClick={() => navigate("/labor/job-search")}
              className="bg-yellow-500 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              🔍 Search Jobs
            </button>
            <button
              onClick={() => navigate("/labor/applications")}
              className="bg-orange-500 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              📄 View Applications
            </button>
            <button
              onClick={() => navigate("/labor/profile")}
              className="bg-green-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              ⚙️ Manage Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
