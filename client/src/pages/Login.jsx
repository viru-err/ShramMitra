// pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        phone,
        password,
      });

      const { token, role } = res.data;

      // Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login successful");

      // Redirect based on role
      if (role === "labor") navigate("/labor/dashboard");
      else if (role === "client") navigate("/client/dashboard");
      else navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="login-phone">
            Phone
          </label>
          <input
            id="login-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
            maxLength={10}
            autoComplete="tel"
            inputMode="numeric"
            pattern="\d{10}"
            placeholder="Enter your 10-digit phone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="login-password">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-sm text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded"
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-700">
        Don't have an account?{" "}
        <span>
          <a
            href="/register-labor"
            className="text-yellow-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          >
            Register as Laborer
          </a>{" "}
          |{" "}
          <a
            href="/register-client"
            className="text-green-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            Register as Client
          </a>
        </span>
      </p>
    </div>
  );
}
