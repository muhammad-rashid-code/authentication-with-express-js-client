"use client";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function SignUpComp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store any error message
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message
  const [loading, setLoading] = useState(false); // State to track the loading status

  // Form submission handler with proper type for event `e`
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    const userData = {
      fullName,
      email,
      password,
      city,
      country,
    };

    setLoading(true); // Start loading

    try {
      // Send a POST request to your API route
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        userData
      ); // Adjust your API URL as needed
      // Success - Handle the response
      setSuccessMessage(response.data.message);
      setErrorMessage(""); // Clear error message if successful

      // Clear the form fields after successful submission
      setFullName("");
      setEmail("");
      setPassword("");
      setCity("");
      setCountry("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows that the error is an AxiosError
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message); // Handle specific API error message
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      } else {
        // If it's not an AxiosError, you can handle it as a generic error
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      setSuccessMessage(""); // Clear success message if there's an error
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Success or Error Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-md transition`}
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Sign In Link */}
          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link href="sign-in" className="text-blue-400 hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
