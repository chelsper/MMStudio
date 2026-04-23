"use client";

import { ArrowRight, BookOpen, Shield, Sparkles, Users } from "lucide-react";

const featureCards = [
  {
    icon: Sparkles,
    title: "Build custom mysteries",
    description: "Create playable party games with clue rounds, character packets, and host controls.",
  },
  {
    icon: Users,
    title: "Run games on phones",
    description: "Players receive mobile-friendly packets, private clues, and accusation flows.",
  },
  {
    icon: Shield,
    title: "Manage private modules",
    description: "Keep custom games hidden, invite-only, and editable without affecting public content.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#312e81_0%,_#0f172a_45%,_#020617_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200/80">
              Murder Mystery Studio
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Build and run mystery games from one control room.
            </h1>
          </div>
          <div className="flex gap-3">
            <a
              href="/account/signin"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Sign in
            </a>
            <a
              href="/pricing"
              className="rounded-lg bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-400"
            >
              Pricing
            </a>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-16">
          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-sm text-fuchsia-100">
                <Sparkles className="h-4 w-4" />
                Host-led mystery builder
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Create private murder mystery games, assign characters, reveal clues by round,
                and guide players through the final accusation from any phone.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/account/signin"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/library"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  View library
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
                Included flows
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-lg font-semibold">Player packets</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Share role packets, secrets, and personal clues with per-player access links.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-lg font-semibold">Host controls</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Reveal round clues, monitor assignments, and control the accusation phase.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-lg font-semibold">Private game modules</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Keep one-off stories like Blackwood Academy separate from any public catalog.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 grid gap-4 md:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <Icon className="h-6 w-6 text-fuchsia-300" />
                <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
