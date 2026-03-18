"use client";

import useAuth from "@/utils/useAuth";
import { Sparkles } from "lucide-react";

function MainComponent() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
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
            Sign Out
          </h1>
          <p className="text-purple-300 mt-2">
            Are you sure you want to sign out?
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-4">
          <button
            onClick={handleSignOut}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-bold transition-all shadow-lg shadow-purple-500/30"
          >
            Sign Out
          </button>
          <a
            href="/"
            className="block w-full text-center bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-medium transition-all border border-white/20"
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
