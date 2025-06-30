export default function About() {
  return (
    <section className="w-full h-[calc(100vh-8rem)] pt-19 bg-yellow-50 overflow-hidden ">
      <div className="flex flex-col md:flex-row h-full w-full gap-6 md:gap-10">
        {/* Left: Thematic Image in a styled box */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-white p-6 md:p-8 w-11/12 md:w-full h-full flex items-center justify-center">
            <img
              src="About-image.png" // change to your relevant image path
              alt="Empowering skilled workers"
              className="w-full h-full  rounded-xl"
              style={{ filter: "brightness(0.7)" }}
            />
          </div>
        </div>

        {/* Right: About Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-white p-6 md:p-8 w-11/12 md:w-full h-full flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6 text-orange-700 drop-shadow-lg text-center">
              How ShramMitra Works
            </h2>
            <p className="text-lg text-amber-800 mb-8 drop-shadow text-center">
              ShramMitra connects skilled laborers with companies in need—providing an accessible, transparent and empowering digital bridge for employment and opportunity.
            </p>

            <div className="space-y-4 mb-10">
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">For Laborers</h3>
                <ul className="list-disc list-inside text-amber-900 ml-4">
                  <li>Showcase skills & experiences</li>
                  <li>Apply for jobs and track status</li>
                  <li>Stay updated with personalized dashboards</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-700 mb-2">For Clients</h3>
                <ul className="list-disc list-inside text-amber-900 ml-4">
                  <li>Post job requirements with ease</li>
                  <li>Browse skilled labor by role or location</li>
                  <li>Hire verified professionals quickly</li>
                </ul>
              </div>
            </div>

            <p className="text-amber-800 text-center max-w-3xl mx-auto">
              ShramMitra is committed to uplifting labor communities by simplifying employment access and building trust between workers and businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
