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
    const e = {};
    if (!formData.title.trim()) e.title = "Job title is required";
    if (!formData.skill.trim()) e.skill = "Skill is required";
    if (!formData.location.trim()) e.location = "Location is required";
    const count = Number(formData.numberOfLaborers);
    if (!count || isNaN(count) || count <= 0) e.numberOfLaborers = "Enter a valid positive number";
    if (!formData.date) e.date = "Start date is required";

    setErrors(e);
    return Object.keys(e).length === 0;
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
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in as a client first.");
        navigate("/login");
        return;
      }

      const payload = {
        ...formData,
        numberOfLaborers: Number(formData.numberOfLaborers),
        date: formData.date,
      };

      await axios.post("http://localhost:5000/api/client/post-job", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job posted successfully!");
      navigate("/my-jobs");
    } catch (err) {
      console.error("Job post failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to post job. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate("/client/dashboard");

  const fields = [
    { name: "title", label: "Job Title" },
    { name: "description", label: "Job Description" },
    { name: "skill", label: "Required Skill" },
    { name: "location", label: "Location" },
    { name: "numberOfLaborers", label: "Number of Laborers", type: "number", min: 1 },
    { name: "date", label: "Start Date", type: "date" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white border-l-4 border-green-500 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 drop-shadow-sm">
            📝 Post a New Job
          </h2>
          <button
            onClick={handleBack}
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow font-medium transition"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ name, label, type = "text", min }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                min={min}
                onChange={handleChange}
                className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                  errors[name] ? "border-red-400" : "border-gray-300"
                }`}
                autoComplete="off"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition font-semibold"
            disabled={submitting}
          >
            {submitting ? "Posting…" : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
