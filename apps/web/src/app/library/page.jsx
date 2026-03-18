"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Trash2, Eye, Plus } from "lucide-react";

export default function LibraryPage() {
  const [mysteries, setMysteries] = useState([]);

  useEffect(() => {
    // Load mysteries from localStorage
    const stored = JSON.parse(localStorage.getItem("mysteries") || "[]");
    setMysteries(stored);
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this mystery?")) {
      const updated = mysteries.filter((m) => m.id !== id);
      setMysteries(updated);
      localStorage.setItem("mysteries", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/"
            className="text-purple-300 hover:text-purple-200 flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 font-crimson-text flex items-center gap-3">
                <BookOpen className="w-10 h-10 text-purple-400" />
                Mystery Library
              </h1>
              <p className="text-purple-200">
                All your Murder Mystery Studio creations ({mysteries.length})
              </p>
            </div>

            <a href="/">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New
              </button>
            </a>
          </div>
        </div>

        {/* Mystery Grid */}
        {mysteries.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              No mysteries yet
            </h2>
            <p className="text-purple-200 mb-6">
              Create your first mystery game to get started
            </p>
            <a href="/">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Mystery
              </button>
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mysteries.map((mystery) => (
              <MysteryCard
                key={mystery.id}
                mystery={mystery}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MysteryCard({ mystery, onDelete }) {
  const { data, config, createdAt } = mystery;
  const date = new Date(createdAt);

  const settingEmojis = {
    "Backyard BBQ": "🍖",
    "Luxury Yacht": "🛥️",
    "High School Reunion": "🎓",
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">
            {settingEmojis[config.setting] || "🎭"}
          </div>
          <button
            onClick={() => onDelete(mystery.id)}
            className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {data.mystery.title}
        </h3>

        <p className="text-purple-200 text-sm mb-4 line-clamp-3">
          {data.mystery.premise}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-xs">
            {config.playerCount} players
          </span>
          <span className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-xs">
            {config.setting}
          </span>
          <span className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-xs">
            {config.tone}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-purple-300 text-sm">
            {date.toLocaleDateString()}
          </span>

          <a href={`/mystery/${mystery.id}`}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              View
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
