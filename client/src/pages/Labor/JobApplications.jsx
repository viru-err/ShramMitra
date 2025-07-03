import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/labor/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplications(response.data.applications || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleBack = () => {
    navigate("/labor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-orange-700 drop-shadow-sm text-center sm:text-left">
            📄 Your Job Applications
          </h1>
          <button
            onClick={handleBack}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow font-semibold transition"
            title="Back to Dashboard"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-lg text-orange-800 text-center">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-orange-700 text-center">You haven’t applied for any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((job) => (
              <div
                key={job._id}
                className="bg-white border-l-4 border-yellow-500 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-orange-700 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-800 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-800 mb-1">
                  <strong>Company:</strong> {job.postedBy || "Not specified"}
                </p>
                <p className="text-sm mt-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      job.status === "Pending"
                        ? "text-yellow-600"
                        : job.status === "Selected"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
