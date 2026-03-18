"use client";

import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Sparkles } from "lucide-react";

function validatePassword(pw) {
  const rules = [
    { test: pw.length >= 8, label: "At least 8 characters" },
    { test: /[0-9]/.test(pw), label: "At least 1 number" },
    { test: /[^A-Za-z0-9]/.test(pw), label: "At least 1 special character" },
  ];
  return rules;
}

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithCredentials } = useAuth();

  const passwordRules = validatePassword(password);
  const passwordValid = passwordRules.every((r) => r.test);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!passwordValid) {
      setError("Password does not meet the requirements below");
      setLoading(false);
      return;
    }

    try {
      const result = await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        // Auth returned an error instead of creating the account
        if (
          result.error === "CredentialsSignin" ||
          result.code === "credentials"
        ) {
          setError(
            "An account with this email already exists. Try signing in instead.",
          );
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
      console.error("Signup error:", err);
      const errorMessage = err?.message || err?.code || String(err);
      const errorMessages = {
        CredentialsSignin:
          "An account with this email already exists. Try signing in instead.",
        EmailCreateAccount:
          "This email can't be used. It may already be registered.",
        AccessDenied: "You don't have permission to sign up.",
      };
      setError(
        errorMessages[errorMessage] ||
          "Something went wrong. Please try again.",
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
            Create Account
          </h1>
          <p className="text-purple-300 mt-2">Join Murder Mystery Studio</p>
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
              placeholder="Create a password"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {password.length > 0 && (
              <ul className="mt-3 space-y-1">
                {passwordRules.map((rule) => (
                  <li
                    key={rule.label}
                    className={`text-xs flex items-center gap-2 ${rule.test ? "text-green-400" : "text-purple-400"}`}
                  >
                    <span>{rule.test ? "✓" : "○"}</span>
                    {rule.label}
                  </li>
                ))}
              </ul>
            )}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-purple-300">
            Already have an account?{" "}
            <a
              href={`/account/signin${typeof window !== "undefined" ? window.location.search : ""}`}
              className="text-purple-200 hover:text-white underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;
