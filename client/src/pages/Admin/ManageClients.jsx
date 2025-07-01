import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Manage Clients</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : clients.length === 0 ? (
        <p className="text-gray-500">No clients found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Company</th>
                {/* <th className="border border-gray-300 px-4 py-2">Email</th> */}
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 px-4 py-2">{client.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{client.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{client.company || <span className="italic text-gray-400">N/A</span>}</td>
                  {/* <td className="border border-gray-300 px-4 py-2">{client.email || <span className="italic text-gray-400">N/A</span>}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
