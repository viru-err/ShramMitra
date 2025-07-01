import { useState } from "react";
import axios from "axios";

export default function RequestLabor() {
  const [formData, setFormData] = useState({
    skill: "",
    number: "",
    location: "",
    urgency: "Normal",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.skill.trim()) newErrors.skill = "Skill is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.number || isNaN(formData.number) || +formData.number < 1)
      newErrors.number = "Enter a valid number of laborers";
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
      const clientId = localStorage.getItem("clientId");
      await axios.post("http://localhost:5000/api/request-labor", {
        ...formData,
        number: Number(formData.number),
        clientId,
      });

      setSuccess(true);
      setFormData({ skill: "", number: "", location: "", urgency: "Normal" });
      setErrors({});
    } catch (err) {
      console.error("Error requesting labor:", err);
      alert(
        err.response?.data?.message || "Failed to submit request. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Request Labor</h2>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
          Labor request submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Skill */}
        <div>
          <label className="block text-gray-700 font-medium">Skill Required</label>
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.skill ? "border-red-400" : "border-gray-300"
            }`}
            autoComplete="off"
          />
          {errors.skill && <p className="text-red-500 text-sm">{errors.skill}</p>}
        </div>

        {/* Number of Laborers */}
        <div>
          <label className="block text-gray-700 font-medium">Number of Laborers</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            min={1}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.number ? "border-red-400" : "border-gray-300"
            }`}
            autoComplete="off"
          />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.location ? "border-red-400" : "border-gray-300"
            }`}
            autoComplete="off"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-gray-700 font-medium">Urgency</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 border-gray-300"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors font-semibold"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
