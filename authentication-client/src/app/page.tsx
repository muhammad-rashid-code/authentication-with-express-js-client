import Link from "next/link";

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center bg-gray-800 p-6 rounded-lg shadow-md max-w-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">My Todo App</h1>

        {/* Description */}
        <p className="text-gray-300 mb-6">
          Using this app, users can sign up and align their daily tasks.
        </p>

        {/* Authentication Links */}
        <div className="space-y-3">
          <p>
            <span className="text-gray-400">Sign in</span>{" "}
            <Link href="sign-in" className="text-blue-400 hover:underline">
              Here
            </Link>
          </p>
          <p>
            <span className="text-gray-400">Sign up</span>{" "}
            <Link href="sign-up" className="text-blue-400 hover:underline">
              Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
