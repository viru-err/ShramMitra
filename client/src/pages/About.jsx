export default function About() {
  return (
    <section className="w-full min-h-screen pt-16 bg-yellow-50 overflow-hidden">
      <div className="flex flex-col md:flex-row h-full w-full gap-8 px-4 pb-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl border-4 border-white p-6 md:p-8 w-full max-w-xl">
            <img
              src="https://images.unsplash.com/photo-1599059811064-cdbe7122f22e?auto=format&fit=crop&w=1600&q=80"
              alt="Skilled labor at work"
              className="w-full h-full rounded-xl object-cover"
              style={{ filter: "brightness(0.85)" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-white p-6 md:p-8 w-full">
            <h2 className="text-4xl font-bold mb-6 text-orange-700 drop-shadow text-center">
              How ShramMitra Works
            </h2>
            <p className="text-lg text-amber-800 mb-8 drop-shadow text-center">
              ShramMitra connects skilled laborers with companies in need—offering a seamless platform for employment, skill showcase, and verified hiring.
            </p>

            <div className="space-y-4 mb-10">
              {/* Laborers Section */}
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">For Laborers</h3>
                <ul className="list-disc list-inside text-amber-900 ml-4">
                  <li>Showcase your skills and experience</li>
                  <li>Search and apply for relevant jobs</li>
                  <li>Track your applications on a personal dashboard</li>
                  <li>Get notified about new opportunities</li>
                </ul>
              </div>

              {/* Clients Section */}
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-700 mb-2">For Clients</h3>
                <ul className="list-disc list-inside text-amber-900 ml-4">
                  <li>Post job requirements quickly and easily</li>
                  <li>Browse and filter laborers by skill or location</li>
                  <li>Hire verified professionals efficiently</li>
                  <li>Manage job posts and track applicants</li>
                </ul>
              </div>
            </div>

            {/* Mission Block */}
            <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 p-4 rounded-lg shadow-md text-center">
              <p className="text-amber-800 font-medium">
                <span className="font-bold">Our Mission:</span> ShramMitra is on a mission to uplift labor communities through technology-driven employment access and trust-building with businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
