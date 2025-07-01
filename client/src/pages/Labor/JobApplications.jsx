import { useEffect, useState } from "react";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulate fetching applied jobs from DB
    const dummyApplications = [
      {
        id: 101,
        title: "Electrician Needed",
        location: "Patna",
        status: "Pending",
        company: "XYZ Constructions",
      },
      {
        id: 102,
        title: "Plumber Required",
        location: "Ranchi",
        status: "Selected",
        company: "AquaWorks Pvt Ltd",
      },
    ];

    setApplications(dummyApplications);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Job Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You have not applied for any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 rounded-lg p-6 shadow bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Company:</strong> {job.company}
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
  );
}
