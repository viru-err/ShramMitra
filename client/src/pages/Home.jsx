import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section
      className=" w-full bg-yellow-50 overflow-x-hidden pt-20 pb-20 mt-10 mb-10"
      style={{
        minHeight: "0",
        height: "calc(100vh - 8rem)", // 4rem for navbar + 4rem for footer
        
      }}
    >
      <div
        className="flex flex-col md:flex-row w-full h-full"
        style={{  height: "100%" }}
      >
        {/* Left Side: Content in a box */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full" style={{ marginBottom: "2px", height: "100%" }}>
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl border-4 border-white p-8 w-11/12 md:w-full flex flex-col justify-center h-full">
            <h1 className="text-4xl font-bold mb-6 text-orange-700 drop-shadow-lg text-center md:text-left">
              Welcome to ShramMitra
            </h1>
            <p className="text-lg text-amber-800 mb-8 drop-shadow text-center md:text-left">
              Connecting skilled laborers with clients and companies. ShramMitra is your digital bridge to employment, skill-sharing, and workforce management.
            </p>

            <div className="space-y-4 mb-10">
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-700">For Laborers</h3>
                <p>Create a profile, showcase skills, apply for jobs, and get hired quickly.</p>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-700">For Clients</h3>
                <p>Post your requirements, browse verified labor profiles, and manage your workforce.</p>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-green-600">
                <h3 className="text-xl font-semibold text-green-700">Secure Platform</h3>
                <p>All users are verified. We ensure a transparent and secure experience for both sides.</p>
              </div>
            </div>

            <Link
              to="/register-labor"
              className="flex justify-center items-center bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow w-full md:w-auto mx-auto"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-full" style={{ marginBottom: "2px", height: "100%" }}>
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
