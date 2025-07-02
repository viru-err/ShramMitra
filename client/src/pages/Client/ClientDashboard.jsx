import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClientDashboard() {
  const [clientData, setClientData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
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

    fetchNotifications(token);
  }, [navigate]);

  const fetchNotifications = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/client/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications || []);
    } catch {
      setNotifications([]);
    }
  };

  const handleAcceptLabor = async (laborId, jobId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/client/accept-laborer",
        { laborId, jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Labor accepted");
      fetchNotifications(token); // Refresh
    } catch (error) {
      console.error("Accept Error:", error);
      alert(error.response?.data?.message || "Failed to accept labor");
    }
  };

  if (!clientData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-green-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex flex-col items-center">
      <div className="pt-28 w-full flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-8">
            <h1 className="text-3xl font-bold text-green-600">
              Welcome, {clientData.name}!
            </h1>
            <div className="relative">
              <button
                onClick={() => setNotifOpen((open) => !open)}
                className="relative bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600 transition font-semibold"
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
                        className={`p-4 border-b last:border-b-0 text-sm ${
                          notif.type === "application" ? "bg-yellow-50" : ""
                        }`}
                      >
                        <div className="font-semibold text-gray-800 mb-1">{notif.message}</div>

                        {notif.meta?.laborName && (
                          <div className="text-gray-600 text-sm">
                            👷 <strong>{notif.meta.laborName}</strong> applied for <strong>{notif.meta.jobTitle}</strong>
                          </div>
                        )}

                        <div className="text-gray-400 text-xs mt-1">
                          {notif.createdAt
                            ? new Date(notif.createdAt).toLocaleString()
                            : ""}
                        </div>

                        {notif.meta?.laborId && notif.meta?.jobId && (
                          <button
                            className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                            onClick={() => handleAcceptLabor(notif.meta.laborId, notif.meta.jobId)}
                          >
                            ✅ Accept Labor
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8 border-l-4 border-green-400 w-full">
            <p className="text-gray-700 mb-2">
              <strong>Company:</strong> {clientData.company}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> {clientData.phone}
            </p>
            <p className="text-gray-700 mb-0">
              <strong>Location:</strong> {clientData.location}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
            <button
              onClick={() => navigate("/post-job")}
              className="bg-green-500 hover:bg-green-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              📝 Post a New Job
            </button>

            <button
              onClick={() => navigate("/my-jobs")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              📋 View My Jobs
            </button>

            <button
              onClick={() => navigate("/view-laborers")}
              className="bg-lime-500 hover:bg-lime-600 text-white py-8 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-300"
            >
              👷‍♂️ Browse Laborers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
