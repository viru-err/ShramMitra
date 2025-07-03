import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterLabor() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skill: "",
    location: "",
    experience: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number is required";
    if (!formData.skill.trim()) newErrors.skill = "Skill is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password (min 6 chars) is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/api/labor/register", formData);
      alert("Laborer registered successfully!");
      setFormData({
        name: "",
        phone: "",
        skill: "",
        location: "",
        experience: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/labor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border-l-4 border-orange-500 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-700">📝 Register as a Laborer</h2>
          <button
            onClick={handleBack}
            className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow font-medium transition"
          >
            ← Back
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Name", name: "name" },
            { label: "Phone", name: "phone" },
            { label: "Skill", name: "skill" },
            { label: "Location", name: "location" },
            { label: "Experience", name: "experience" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:ring-orange-500 focus:border-orange-500"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
