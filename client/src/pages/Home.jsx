// pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section
      className="w-full bg-yellow-50 overflow-x-hidden pt-20 pb-20"
      style={{
        minHeight: "0",
        height: "calc(100vh - 8rem)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center h-full px-4 gap-8">
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl border-4 border-white p-8 w-full flex flex-col justify-center h-full">
            <h1 className="text-4xl font-bold mb-6 text-orange-700 drop-shadow-lg text-center md:text-left">
              Welcome to ShramMitra
            </h1>
            <p className="text-lg text-amber-800 mb-8 drop-shadow text-center md:text-left">
              Empowering laborers with digital access to jobs and clients with skilled workforce on demand.
              <br className="hidden md:block" />
              ShramMitra bridges the gap between talent and opportunity.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-10">
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-700">For Laborers</h3>
                <ul className="list-disc list-inside text-amber-900 ml-4">
                  <li>Register, build your profile, and apply to jobs posted by verified clients.</li>
                  <li>Track your applications and get notified about new opportunities.</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-700">For Clients</h3>
                <ul className="list-disc list-inside text-amber-900 ml-4">
                  <li>Hire skilled laborers based on skillset, location, and availability.</li>
                  <li>Post job requirements and manage applicants easily.</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-green-600">
                <h3 className="text-xl font-semibold text-green-700">Secure Platform</h3>
                <ul className="list-disc list-inside text-green-900 ml-4">
                  <li>Identity verification for trust and safety.</li>
                  <li>Secure communication for both parties.</li>
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/register-labor"
                className="text-center bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Register as Laborer
              </Link>
              <Link
                to="/register-client"
                className="text-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Register as Client
              </Link>
            </div>

            {/* Login prompt */}
            <p className="text-center mt-6 text-sm text-gray-700">
              Already registered?{" "}
              <Link to="/login" className="text-orange-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1581093588401-1b9b68b0d3a5?auto=format&fit=crop&w=1600&q=80"
            alt="Labor at work"
            className="object-cover rounded-2xl shadow-2xl border-4 border-white w-full max-h-[500px]"
            style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.25)" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
