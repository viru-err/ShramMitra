import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
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
    setSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/client/register", formData);
      alert("Client registered successfully!");
      setFormData({
        name: "",
        phone: "",
        company: "",
        location: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate("/client/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl bg-white border-l-4 border-green-500 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 drop-shadow-sm">
            🏢 Register as a Client
          </h2>
          <button
            onClick={handleBack}
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow font-medium transition"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Phone", name: "phone", type: "tel", maxLength: 10 },
            { label: "Company", name: "company", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type = "text", maxLength }) => (
            <div key={name}>
              <label className="block font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                maxLength={maxLength}
                className={`w-full border rounded px-4 py-2 focus:ring-green-300 focus:border-green-500 ${
                  errors[name] ? "border-red-400" : "border-gray-300"
                }`}
                autoComplete={name === "password" ? "new-password" : "off"}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
            disabled={submitting}
          >
            {submitting ? "Registering…" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
