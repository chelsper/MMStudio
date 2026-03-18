"use client";

import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Sparkles } from "lucide-react";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        if (
          result.error === "CredentialsSignin" ||
          result.code === "credentials"
        ) {
          setError("Incorrect email or password. Please try again.");
        } else {
          setError(result.error || "Something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }

      // Success — redirect to the callback URL
      const callbackUrl = result?.url || "/";
      window.location.href = callbackUrl;
    } catch (err) {
      console.error("Signin error:", err);
      const errorMessage = err?.message || err?.code || String(err);
      const errorMessages = {
        CredentialsSignin: "Incorrect email or password. Please try again.",
        AccessDenied: "You don't have permission to sign in.",
      };
      setError(
        errorMessages[errorMessage] ||
          "Something went wrong. Please check your email and password and try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-full border border-purple-500/30">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white font-crimson-text">
            Welcome Back
          </h1>
          <p className="text-purple-300 mt-2">
            Sign in to Murder Mystery Studio
          </p>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block text-purple-200 font-medium mb-2 text-sm">
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-purple-200 font-medium mb-2 text-sm">
              Password
            </label>
            <input
              required
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-purple-300">
            Don't have an account?{" "}
            <a
              href={`/account/signup${typeof window !== "undefined" ? window.location.search : ""}`}
              className="text-purple-200 hover:text-white underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;
