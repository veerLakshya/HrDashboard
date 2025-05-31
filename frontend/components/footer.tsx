import React from "react";
import Link from "next/link";
import FlamLogo from "./FlamLogo";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-zinc-800 py-12 mt-auto">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
        {/* icon and text */}
        <div className="col-span-1">
          {" "}
          <div className="flex items-center mb-5">
            <FlamLogo className="w-9 h-9 mr-3" alt="flamapp logo" />
            <span className="text-white font-semibold text-xl">Flamapp.ai</span>
          </div>
          <p className="text-gray-400 mb-5 leading-relaxed">
            Leading advertising solutions for modern companies. Streamline your
            marketing operations and enhance customer engagement.
          </p>{" "}
          <div className="flex space-x-5">
            <Link
              href="https://x.com/flamappofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 p-2 rounded-full hover:bg-zinc-800"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.instagram.com/flamappofficial/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 p-2 rounded-full hover:bg-zinc-800"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/flamappofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 p-2 rounded-full hover:bg-zinc-800"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* links */}
        <div className="col-span-1">
          {" "}
          <h3 className="text-white font-semibold mb-5 text-lg">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/analytics"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/bookmarks"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Bookmarks
              </Link>
            </li>
            <li>
              <Link
                href="/user-info"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* resources */}
        <div className="col-span-1">
          <h3 className="text-white font-semibold mb-5 text-lg">Resources</h3>
          <ul className="space-y-2">
            {" "}
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                API Reference
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-[#D6FF00] transition-colors duration-200 block py-1"
              >
                Blog
              </Link>
            </li>
          </ul>{" "}
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
          {/* my info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Creator Information
            </h3>
            <p className="text-gray-400">
              Designed and developed by{" "}
              <span className="text-[#D6FF00] font-medium">
                Lakshya Veer Singh
              </span>
            </p>
            <Link
              href="https://github.com/veerLakshya/hrdashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-[#D6FF00] hover:text-black text-white px-5 py-3 rounded-md border border-zinc-700 hover:border-[#D6FF00] transition-all duration-300 cursor-pointer font-medium mt-2 w-full sm:w-auto"
            >
              <span>View Source Code</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 pt-8 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Flamapp.ai. All rights reserved.
          </p>{" "}
          <div className="flex mt-4 md:mt-0 space-x-6">
            {" "}
            <Link
              href="https://flamapp.ai/privacy"
              className="hover:text-[#D6FF00] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://flamapp.ai/terms"
              className="hover:text-[#D6FF00] transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="https://flamapp.ai/press
              
              "
              className="hover:text-[#D6FF00] transition-colors duration-200"
            >
              Media & Press
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
