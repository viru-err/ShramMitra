import { useState } from "react";
import axios from "axios";

export default function RegisterClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    location: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password (min 6 chars) is required";
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
    setSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/client/register", formData);
      alert("Client registered successfully!");
      setFormData({ name: "", phone: "", company: "", location: "", password: "" });
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Register as a Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "tel", maxLength: 10 },
          { label: "Company", name: "company", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Password", name: "password", type: "password" },
        ].map(({ label, name, type = "text", maxLength }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              maxLength={maxLength}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 ${
                errors[name] ? "border-red-400" : ""
              }`}
              autoComplete={name === "password" ? "new-password" : "off"}
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          disabled={submitting}
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
