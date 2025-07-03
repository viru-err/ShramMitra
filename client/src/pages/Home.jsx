// pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className=" w-full overflow-hidden" style={{ height: 'calc(100vh - 5rem - 4rem)' }}>
      {/* Image Layer */}
      <img
        src="/home-image.jpg" // Replace with your actual image path
        alt="ShramMitra background"
        className="absolute inset-0 w-full h-full object-center z-0"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0  bg-opacity-50 z-10" />

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="max-w-3xl w-full  bg-opacity-90 border-4 border-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-6 text-orange-500 text-center drop-shadow-lg">
            Welcome to ShramMitra
          </h1>
          <p className="text-lg text-amber-100 mb-8 text-center drop-shadow">
            Empowering laborers with digital access to jobs and clients with skilled workforce on demand.
            <br />
            ShramMitra bridges the gap between talent and opportunity.
          </p>

          <div className="space-y-4 mb-10">
            {/* Laborers */}
            <div className=" bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-yellow-100 mb-1">For Laborers</h3>
              <ul className="list-disc list-inside text-orange-100 ml-4">
                <li>Register and apply for jobs</li>
                <li>Get notified about new opportunities</li>
              </ul>
            </div>

            {/* Clients */}
            <div className="bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-orange-100 mb-1">For Clients</h3>
              <ul className="list-disc list-inside text-orange-100 ml-4">
                <li>Post jobs and filter laborers</li>
                <li>Hire verified professionals</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <Link
              to="/register-labor"
              className="bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg shadow font-semibold hover:opacity-90"
            >
              Register as Laborer
            </Link>
            <Link
              to="/register-client"
              className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-3 rounded-lg shadow font-semibold hover:opacity-90"
            >
              Register as Client
            </Link>
          </div>

          <p className="text-sm text-center mt-6 text-white">
            Already registered?{" "}
            <Link to="/login" className="text-orange-500 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
