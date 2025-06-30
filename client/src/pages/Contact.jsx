import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("service_0blr8z7", "template_kuvved6", form, "GfrMrjzXpGat85N-t")
      .then(
        () => {
          alert("Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        },
        () => {
          alert("Something went wrong. Try again later.");
        }
      );
  };

  return (
    <section className="bg-yellow-50 py-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">Contact Us</h2>
        <p className="text-center text-amber-800 mb-6">
          You can reach us at:
          <br />
          <strong>Email:</strong> realvirus4u@gmail.com
          <br />
          <strong>Phone:</strong> +91 7667812506
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md border-l-4 border-amber-500"
        >
          <div>
            <label className="block mb-2 font-semibold text-amber-800">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-amber-800">Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-amber-800">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-yellow-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 text-white px-6 py-2 rounded hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
