import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto p-8 mt-12 bg-white shadow-xl rounded-2xl">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-10 text-center drop-shadow">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <Link
          to="/admin/laborers"
          className="flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 p-8 rounded-xl shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <span className="text-2xl font-semibold mb-2">Manage Laborers</span>
          <span className="text-sm opacity-80">
            View, edit, or remove laborer accounts
          </span>
        </Link>

        <Link
          to="/admin/clients"
          className="flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 transition-colors duration-200 p-8 rounded-xl shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <span className="text-2xl font-semibold mb-2">Manage Clients</span>
          <span className="text-sm opacity-80">
            View, edit, or remove client accounts
          </span>
        </Link>

        <Link
          to="/admin/jobs"
          className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors duration-200 p-8 rounded-xl shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span className="text-2xl font-semibold mb-2">Manage Job Posts</span>
          <span className="text-sm opacity-80">
            Review and moderate job postings
          </span>
        </Link>
      </div>
    </div>
  );
}
