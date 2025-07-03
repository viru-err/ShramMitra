import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSending(true);

    emailjs
      .send("service_0blr8z7", "template_kuvved6", form, "GfrMrjzXpGat85N-t")
      .then(
        () => {
          toast.success("Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
          setSending(false);
        },
        () => {
          toast.error("Something went wrong. Try again later.");
          setSending(false);
        }
      );
  };

  return (
  <section className=" w-full overflow-hidden" style={{ height: 'calc(100vh - 5rem - 4rem)' }}>
      {/* Image Layer */}
      <img
        src="/home-image.jpg" // Replace with your actual image path
        alt="ShramMitra background"
        className="absolute inset-0 w-full h-full object-center z-0"
      />

      {/* Contrast overlay */}
      <div className="absolute inset-0  bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="max-w-3xl w-full  bg-opacity-90 backdrop-blur-sm border-4 border-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold mb-6 text-orange-500 text-center drop-shadow-lg">
            Contact Us
          </h2>

          <p className="text-center text-amber-100 mb-6 drop-shadow">
            You can reach us at:<br />
            <strong>Email:</strong>{" "}
            <a href="mailto:realvirus4u@gmail.com" className="underline hover:text-orange-300">
              realvirus4u@gmail.com
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a href="tel:+917667812506" className="underline hover:text-orange-300">
              +91 7667812506
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6  bg-opacity-95 rounded-lg shadow p-6 border-l-4 border-amber-500"
          >
            <div>
              <label className="block mb-2 font-semibold text-amber-100" htmlFor="contact-name">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded   focus:border-yellow-400 text-amber-50"
                required
                autoComplete="off"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-amber-100" htmlFor="contact-email">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded   focus:border-yellow-400 text-amber-50"
                required
                autoComplete="off"
                maxLength={60}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-amber-100" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded   focus:border-yellow-400 text-amber-50"
                required
                maxLength={1000}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white px-6 py-2 rounded shadow font-semibold hover:opacity-90 transition ${
                sending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
