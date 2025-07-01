import { useState, useEffect } from "react";

export default function ProfileManagement() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skills: "",
  });

  useEffect(() => {
    // Simulate loading user info
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
    // Later: Send PUT request to backend
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Manage Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded border border-gray-300 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
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
          <label className="block mb-1 font-medium text-gray-700">
            Phone Number
          </label>
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
          <label className="block mb-1 font-medium text-gray-700">
            Skills (comma-separated)
          </label>
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
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
