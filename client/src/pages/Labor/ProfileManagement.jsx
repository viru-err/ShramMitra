import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileManagement() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skills: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const dummyProfile = {
      name: "Virukumar",
      phone: "7667812506",
      skills: "Electrician, Plumber",
    };
    setFormData(dummyProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // TODO: Connect with backend
  };

  const handleBack = () => {
    navigate("/labor/dashboard"); // Adjust this route if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-orange-700 drop-shadow-sm">
            ⚙️ Manage Profile
          </h1>
          <button
            onClick={handleBack}
            className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700 transition font-semibold"
            title="Back to Dashboard"
          >
            ← Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-l-4 border-orange-400 shadow-lg rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
