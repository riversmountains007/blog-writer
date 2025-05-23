import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-40 w-full bg-[#ADD8E6] py-8 px-4 md:px-8 border-t border-sky-200">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
    {/* Brand Info */}
    <div className="space-y-2 flex-1">
      <p className="text-gray-600 font-medium">&copy; 2025 Enterprises of Wandel</p>
      <address className="text-gray-500 not-italic text-sm">
        South Street, Bala Nagar<br/>
        Hyderabad, India<br/>
      </address>
    </div>

    {/* Legal Links */}
    <div className="space-y-2 flex-1">
      <div className="flex flex-col gap-2">
        <Link 
          to="https://www.freeprivacypolicy.com/live/e0d78b29-4844-4295-90b1-076c50e1c1d9" 
          className="text-sky-700 hover:text-sky-900 transition-colors text-sm"
        >
          Terms and Conditions
        </Link>
        <Link
          to="https://www.freeprivacypolicy.com/live/7aec1f3d-a289-4026-b82c-7b3438da2981"
          className="text-sky-700 hover:text-sky-900 transition-colors text-sm"
        >
          Privacy Policy
        </Link>
      </div>
    </div>

    {/* Newsletter */}
    <div className="flex-1 space-y-3">
      <p className="text-gray-600 font-medium">Subscribe to our newsletter</p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-sky-500 px-4 py-2 text-sm focus:outline-none focus:ring-2  text-gray-600"
        />
        <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  </div>
</footer>
  );
}

export default Footer;