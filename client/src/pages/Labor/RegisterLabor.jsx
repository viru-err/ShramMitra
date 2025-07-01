// pages/Labor/RegisterLabor.jsx
import { useState } from "react";
import axios from "axios";

export default function RegisterLabor() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skill: "",
    location: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number is required";
    if (!formData.skill.trim()) newErrors.skill = "Skill is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  

// ...

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await axios.post("http://localhost:5000/api/labor/register", formData);
    alert("Labor registered successfully!");
    setFormData({ name: "", phone: "", skill: "", location: "", experience: "" });
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Please try again.");
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Register as a Laborer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name" },
          { label: "Phone", name: "phone" },
          { label: "Skill", name: "skill" },
          { label: "Location", name: "location" },
          { label: "Experience", name: "experience" }
        ].map(({ label, name }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
