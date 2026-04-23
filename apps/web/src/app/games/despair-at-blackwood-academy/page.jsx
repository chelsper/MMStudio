"use client";

import { ArrowRight, Drama, ShieldAlert, Sparkles, Users } from "lucide-react";
import { despairAtBlackwoodAcademyTemplate } from "@/data/privateMysteries/despairAtBlackwoodAcademy";

const featureItems = [
  {
    icon: Users,
    title: "10 players, 11 optional",
    body: "Built for 10 core players with an optional bonus role that can be added naturally without breaking the deduction flow.",
  },
  {
    icon: Sparkles,
    title: "Mobile-first packets",
    body: "Each player receives a skimmable phone-friendly packet with public bio, private clues, and roleplay guidance.",
  },
  {
    icon: ShieldAlert,
    title: "Original suspense vibe",
    body: "Anime-inspired social deduction energy with an original setting, original terminology, and teen-appropriate tone.",
  },
];

export default function DespairAtBlackwoodAcademyPublicPage() {
  const mystery = despairAtBlackwoodAcademyTemplate.mysteryData.mystery;
  const rounds = mystery.clues.map((clue) => clue.title);
  const visibleCharacters = mystery.characters.filter(
    (character) => !character.isVictim,
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#581c87_0%,_#111827_45%,_#020617_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-black/25 p-8 shadow-2xl backdrop-blur md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-100">
            <Drama className="h-4 w-4" />
            Private game module
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {despairAtBlackwoodAcademyTemplate.title}
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-200">
            {despairAtBlackwoodAcademyTemplate.subtitle}
          </p>

          <p className="mt-8 max-w-3xl text-base leading-8 text-slate-300">
            {mystery.premise}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              10 players standard
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Optional 11th player
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Host required
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Teen-appropriate suspense
            </span>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featureItems.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Icon className="h-5 w-5 text-fuchsia-300" />
                <h2 className="mt-4 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold">What players can expect</h2>
            <ol className="mt-6 space-y-4 text-slate-200">
              {rounds.map((roundTitle, index) => (
                <li
                  key={roundTitle}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500/20 text-sm font-bold text-fuchsia-100">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{roundTitle}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Shared evidence, private suspicion, and a steadily tighter suspect pool.
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold">Roster snapshot</h2>
            <p className="mt-2 text-sm text-slate-300">
              The live game uses 10 active student roles, with Rei Sato available as an optional
              11th bonus role.
            </p>

            <div className="mt-6 space-y-3">
              {visibleCharacters.slice(0, 6).map((character) => (
                <div
                  key={character.name}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="font-semibold">{character.name}</p>
                  <p className="text-sm text-fuchsia-200">{character.role}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
              This link is public and does not require login. Player-specific secrets and live game
              actions still use their individual packet links from the host.
            </div>

            <a
              href="/account/signin"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Host sign in
              <ArrowRight className="h-4 w-4" />
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
