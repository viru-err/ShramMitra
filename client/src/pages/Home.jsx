// pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section
      className="w-full bg-yellow-50 overflow-x-hidden pt-20 pb-20 mt-10 mb-10"
      style={{
        minHeight: "0",
        height: "calc(100vh - 8rem)",
      }}
    >
      <div className="flex flex-col md:flex-row w-full h-full" style={{ height: "100%" }}>
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl border-4 border-white p-8 w-11/12 md:w-full flex flex-col justify-center h-full">
            <h1 className="text-4xl font-bold mb-6 text-orange-700 drop-shadow-lg text-center md:text-left">
              Welcome to ShramMitra
            </h1>
            <p className="text-lg text-amber-800 mb-8 drop-shadow text-center md:text-left">
              Empowering laborers with digital access to jobs and clients with skilled workforce on demand. ShramMitra bridges the gap between talent and opportunity.
            </p>

            <div className="space-y-4 mb-10">
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-700">For Laborers</h3>
                <p>Register, build your profile, and apply to jobs posted by verified clients.</p>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-700">For Clients</h3>
                <p>Hire skilled laborers based on skillset, location, and availability.</p>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-green-600">
                <h3 className="text-xl font-semibold text-green-700">Secure Platform</h3>
                <p>We ensure identity verification and secure communication for both parties.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/register-labor"
                className="text-center bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow"
              >
                Register as Laborer
              </Link>

              <Link
                to="/register-client"
                className="text-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow"
              >
                Register as Client
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-full">
          <div className="h-full w-11/12 md:w-full flex items-center justify-center">
            <img
              src="home-image.jpg"
              alt="Labor at work"
              className="object-cover rounded-2xl shadow-2xl border-4 border-white w-full h-full"
              style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.25)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
