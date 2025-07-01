import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skill: "",
    location: "",
    numberOfLaborers: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.skill.trim()) newErrors.skill = "Skill is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (
      !formData.numberOfLaborers ||
      isNaN(formData.numberOfLaborers) ||
      Number(formData.numberOfLaborers) <= 0
    )
      newErrors.numberOfLaborers = "Enter a valid positive number";
    if (!formData.date) newErrors.date = "Start date is required";
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
      // Optionally, add authentication headers here
      const payload = {
        ...formData,
        numberOfLaborers: Number(formData.numberOfLaborers),
        deadline: formData.date,
      };
      delete payload.date;
      const res = await axios.post("http://localhost:5000/api/jobs/post", payload);
      alert("Job posted successfully!");
      navigate("/my-jobs");
    } catch (err) {
      console.error("Job post failed:", err);
      alert("Failed to post job. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white mt-10 shadow rounded">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "title", label: "Job Title" },
          { name: "description", label: "Job Description" },
          { name: "skill", label: "Required Skill" },
          { name: "location", label: "Location" },
          { name: "numberOfLaborers", label: "Number of Laborers", type: "number", min: 1 },
          { name: "date", label: "Start Date", type: "date" },
        ].map(({ name, label, type = "text", min }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              min={min}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                errors[name] ? "border-red-400" : ""
              }`}
              autoComplete="off"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors font-semibold"
          disabled={submitting}
        >
          {submitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
