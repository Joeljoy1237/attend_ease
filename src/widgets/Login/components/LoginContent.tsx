"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import customToast from "@components/CustomToast";
import { useRouter } from "next/navigation";

export default function LoginContent() {
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    console.log(status);
    if (status === "authenticated") {
      router.replace("/dashboard/home");
    }
  }, [status]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      console.log("called");
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      router.push("/dashboard/home");
      if (res?.ok) {
        customToast({
          type: "success",
          message: "Login Successful",
          desc: "Redirecting to the dashboard",
        });
      }
    } catch (error: any) {
      setError(error.code); // Extract and set the error message
      // Handle specific Firebase authentication errors
      if (error.code === "auth/invalid-credential") {
        customToast({
          type: "error",
          message: "Invalid Email or Password",
        });
      } else if (error.code === "auth/invalid-password") {
        customToast({
          type: "error",
          message: "Invalid Password",
        });
      } else if (error.code === "auth/invalid-email") {
        customToast({
          type: "error",
          message: "Invalid Email",
        });
      } else {
        customToast({
          type: "error",
          message: error.message || "An error occurred. Please try again.",
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back to <span className="text-azure-600">Attend Ease</span>
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-azure-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-azure-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-5 justify-between items-center mb-6">
            <button
              type="submit"
              className="w-full bg-azure-600 text-white py-3 rounded-md hover:bg-azure-700 transition duration-200"
            >
              Login
            </button>
            <a
              href="#"
              className="text-sm text-azure-600 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="flex justify-center">
          <p className="text-center text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@attendease.com"
              className="text-azure-600 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
