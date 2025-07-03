import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/client");
        setClients(res.data?.clients || []);
        setError("");
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load clients.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white border-l-4 border-green-500 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-green-700 drop-shadow-sm">
            👥 Manage Clients
          </h2>
          <button
            onClick={() => navigate("/admin")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow font-medium transition"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-green-700 text-lg">Loading clients...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : clients.length === 0 ? (
          <p className="text-gray-600 text-lg">No clients found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow mt-4">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white text-sm">
              <thead>
                <tr className="bg-green-100 text-gray-700 font-semibold">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-50 transition">
                    <td className="border border-gray-300 px-4 py-2">{client.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{client.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.company || (
                        <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
