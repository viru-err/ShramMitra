import { useEffect, useState } from "react";
import axios from "axios";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 5rem - 4rem)" }}
    >
      {/* Optional background image layer */}
      <img
        src="/home-image.jpg"
        alt="Job applications background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0  bg-opacity-50 z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center drop-shadow-lg">
          Your Job Applications
        </h1>

        {loading ? (
          <p className="text-lg text-white text-center">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-white text-center">
            You haven’t applied for any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((job) => (
              <div
                key={job._id}
                className="bg-white bg-opacity-95 border-l-4 border-yellow-500 rounded-lg shadow p-6"
              >
                <h2 className="text-xl font-semibold text-orange-700 mb-2">
                  {job.title}
                </h2>
                <p className="text-amber-900 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-amber-900 mb-1">
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
    </section>
  );
}
