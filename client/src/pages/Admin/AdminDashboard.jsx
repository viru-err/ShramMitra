import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white border-l-4 border-blue-500 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
            🛠️ Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow font-semibold transition"
          >
            🚪 Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <Link
            to="/admin/laborers"
            className="flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition p-8 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <span className="text-2xl font-semibold mb-2">Manage Laborers</span>
            <span className="text-sm opacity-80 text-center">
              View, edit, or remove laborer accounts
            </span>
          </Link>

          <Link
            to="/admin/clients"
            className="flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 transition p-8 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <span className="text-2xl font-semibold mb-2">Manage Clients</span>
            <span className="text-sm opacity-80 text-center">
              View, edit, or remove client accounts
            </span>
          </Link>

          <Link
            to="/admin/jobs"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 transition p-8 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="text-2xl font-semibold mb-2">Manage Job Posts</span>
            <span className="text-sm opacity-80 text-center">
              Review and moderate job postings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
