import React from 'react';

export default function About() {
  return (
   <section className=" w-full overflow-hidden" style={{ height: 'calc(100vh - 5rem - 4rem)' }}>
      {/* Image Layer */}
      <img
        src="/home-image.jpg" // Replace with your actual image path
        alt="ShramMitra background"
        className="absolute inset-0 w-full h-full object-center z-0"
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0  bg-opacity-50 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="max-w-4xl w-full  bg-opacity-90 backdrop-blur-sm border-4 border-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold mb-6 text-orange-500 text-center drop-shadow-lg">
            How ShramMitra Works
          </h2>
          <p className="text-lg text-amber-100 mb-8 text-center drop-shadow">
            ShramMitra connects skilled laborers with companies in need—offering a seamless platform for employment, skill showcase, and verified hiring.
          </p>

          <div className="space-y-4 mb-10">
            {/* Laborers */}
            <div className="bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-yellow-100 mb-1">For Laborers</h3>
              <ul className="list-disc list-inside text-orange-100 ml-4">
                <li>Showcase your skills and experience</li>
                <li>Search and apply for relevant jobs</li>
                <li>Track your applications on a personal dashboard</li>
                <li>Get notified about new opportunities</li>
              </ul>
            </div>

            {/* Clients */}
            <div className="bg-opacity-95 rounded-lg shadow p-4 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-orange-100 mb-1">For Clients</h3>
              <ul className="list-disc list-inside text-orange-100 ml-4">
                <li>Post job requirements quickly and easily</li>
                <li>Browse and filter laborers by skill or location</li>
                <li>Hire verified professionals efficiently</li>
                <li>Manage job posts and track applicants</li>
              </ul>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 p-4 rounded-lg shadow-md text-center">
            <p className="text-white font-medium">
              <span className="font-bold">Our Mission:</span> ShramMitra is on a mission to uplift labor communities through technology-driven employment access and trust-building with businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
