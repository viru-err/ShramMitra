import { useEffect, useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulated fetch from backend
    const dummyNotifications = [
      {
        id: 1,
        message: "Your application for 'Plumber Needed in Patna' is under review.",
        date: "2025-06-27",
        read: false,
      },
      {
        id: 2,
        message: "Admin has verified your labor profile.",
        date: "2025-06-26",
        read: true,
      },
    ];
    setNotifications(dummyNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">You have no notifications at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded shadow border ${
                notif.read ? "bg-gray-100" : "bg-yellow-50"
              }`}
            >
              <p className="text-gray-800 mb-1">{notif.message}</p>
              <p className="text-sm text-gray-500 mb-2">{notif.date}</p>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-sm bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
