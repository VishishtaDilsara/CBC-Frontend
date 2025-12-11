import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactsPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function sendMessage() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-message", {
        name: name,
        email: email,
        message: message,
      })
      .then((res) => {
        toast.success("Message sent successfully");
      })
      .catch((err) => {
        toast.error("Error sending message");
        console.log(err);
      });
  }
  return (
    <div className="w-full min-h-screen bg-primary flex justify-center items-start py-16 px-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-secondary text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mt-3">
          We'd love to hear from you! Whether you have questions, feedback, or
          partnership requests — reach out anytime.
        </p>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-secondary">
              Get in Touch
            </h2>

            <div className="bg-primary/70 rounded-xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-secondary">Email</h3>
              <p className="text-gray-700 mt-1">support@beautyglow.com</p>
            </div>

            <div className="bg-primary/70 rounded-xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-secondary">Phone</h3>
              <p className="text-gray-700 mt-1">+1 (202) 555-0148</p>
            </div>

            <div className="bg-primary/70 rounded-xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-secondary">
                Customer Care
              </h3>
              <p className="text-gray-700 mt-1">
                Monday – Friday | 9:00 AM – 6:00 PM
              </p>
            </div>

            <div className="bg-primary/70 rounded-xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-secondary">Location</h3>
              <p className="text-gray-700 mt-1">
                45 Bloom Street, Los Angeles, CA, USA
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-primary/60 p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-secondary mb-6">
              Send Us a Message
            </h2>

            <div className="flex flex-col gap-5">
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Your Name"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email Address"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <textarea
                rows="4"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Message"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>

              <button
                onClick={sendMessage}
                className="w-full h-12 rounded-xl bg-accent text-white font-semibold text-lg hover:bg-accent/90 shadow-md active:scale-95 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <p className="text-center text-gray-500 text-sm mt-10">
          We typically respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
