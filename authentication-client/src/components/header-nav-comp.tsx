"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBarComp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            TaskManager
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="/" className="hover:text-gray-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/sign-in" className="hover:text-gray-400 transition">
                Signin
              </a>
            </li>
            <li>
              <a href="/sign-up" className="hover:text-gray-400 transition">
                Signup
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Add Tasks
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col space-y-4 py-4">
            <li>
              <a href="/" className="block text-center py-2 hover:bg-gray-800">
                Home
              </a>
            </li>
            <li>
              <a
                href="/signin"
                className="block text-center py-2 hover:bg-gray-800"
              >
                Signin
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="block text-center py-2 hover:bg-gray-800"
              >
                Signup
              </a>
            </li>
            <li>
              <a
                href="/add-tasks"
                className="block text-center py-2 hover:bg-gray-800"
              >
                Add Tasks
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
