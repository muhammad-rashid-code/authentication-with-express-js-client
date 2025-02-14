"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignUpComp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    city: "",
    country: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://authentication-with-express-js-server.vercel.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccessMessage(data.message);
      setErrorMessage(""); // Clear errors

      // Clear form
      setFormData({ fullName: "", email: "", password: "", city: "", country: "" });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
      setSuccessMessage(""); // Clear success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Success/Error Messages */}
        {successMessage && <div className="bg-green-500 p-3 rounded mb-4">{successMessage}</div>}
        {errorMessage && <div className="bg-red-500 p-3 rounded mb-4">{errorMessage}</div>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["fullName", "email", "password", "city", "country"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")} {/* Converts camelCase to readable text */}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-md transition`}
          >
            {loading ? <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" /> : "Sign Up"}
          </button>

          {/* Sign In Link */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-400 hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
