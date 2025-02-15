"use client";

import Link from "next/link";
import { useState } from "react";

export default function SigninComp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To hold error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(""); // Reset the error on each submit
    setLoading(true); // Start loading

    // Basic client-side validation
    if (!email || !password) {
      const errorMessage = "Email and password are required.";
      setError(errorMessage);
      console.error("Client Error:", errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://authentication-with-express-js-server.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Server error handling
        setError(data.message || "Something went wrong on the server.");
        console.error("Server Error:", data.message);
      } else {
        // Success handling
        console.log("Login successful:", data);
        // Clear the input fields after successful login
        setEmail("");
        setPassword("");
        // Handle successful login (store token, redirect, etc.)
      }
    } catch (error) {
      // Network or unexpected errors
      setError("Network error: Please try again later.");
      console.error("Network Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-500" : "bg-blue-600"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link href="sign-up" className="text-blue-400 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
