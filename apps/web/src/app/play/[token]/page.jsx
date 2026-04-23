"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Lock,
  Unlock,
  ChevronRight,
  Users,
  Skull,
  Eye,
  Loader2,
  RefreshCw,
  Clock,
  Vote,
  Check,
} from "lucide-react";

export default function PlayPage({ params }) {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClueDetail, setShowClueDetail] = useState(null);
  const [newClueFlash, setNewClueFlash] = useState(null);
  const prevCluesRef = useRef(0);
  const cluesSectionRef = useRef(null);
  const [jumpToClues, setJumpToClues] = useState(false);

  // Voting state
  const [selectedVote, setSelectedVote] = useState(null);
  const [submittingVote, setSubmittingVote] = useState(false);
  const [voteError, setVoteError] = useState(null);

  const fetchGameData = useCallback(async () => {
    try {
      const response = await fetch(`/api/play/${params.token}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to load game");
      }
      const data = await response.json();

      // Check if new clues were revealed since last poll
      if (
        prevCluesRef.current > 0 &&
        data.cluesRevealed > prevCluesRef.current
      ) {
        setNewClueFlash(data.cluesRevealed - 1);
        setTimeout(() => setNewClueFlash(null), 3000);
      }
      prevCluesRef.current = data.cluesRevealed;

      setGameData(data);

      // Initialize selected vote from server data
      if (data.myVote && !selectedVote) {
        setSelectedVote(data.myVote);
      }
    } catch (err) {
      console.error("Error loading game:", err);
      if (!gameData) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [params.token]);

  useEffect(() => {
    fetchGameData();
    const interval = setInterval(fetchGameData, 5000);
    return () => clearInterval(interval);
  }, [fetchGameData]);

  // Scroll to clues section when returning from detail
  useEffect(() => {
    if (jumpToClues && !showClueDetail && cluesSectionRef.current) {
      cluesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setJumpToClues(false);
    }
  }, [jumpToClues, showClueDetail]);

  const handleBackFromClue = () => {
    setShowClueDetail(null);
    setJumpToClues(true);
  };

  const handleVote = async (characterName) => {
    setSelectedVote(characterName);
    setSubmittingVote(true);
    setVoteError(null);

    try {
      const response = await fetch(`/api/play/${params.token}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votedFor: characterName }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to submit vote");
      }

      await fetchGameData();
    } catch (err) {
      console.error("Error voting:", err);
      setVoteError(err.message);
    } finally {
      setSubmittingVote(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <Loader2
            className="w-6 h-6"
            style={{ animation: "spin 1s linear infinite" }}
          />
          Loading your character...
        </div>
        <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔒</div>
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <p className="text-purple-300">
            This link may be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  if (!gameData) return null;

  const {
    mysteryTitle,
    premise,
    character,
    victim,
    totalClues,
    cluesRevealed,
    visibleClues,
    allCharacters,
    setting,
    isKiller,
    timeline,
    votingOpen,
    myVote,
  } = gameData;
  const hasMoreClues = cluesRevealed < totalClues;

  // If viewing a specific clue detail
  if (showClueDetail !== null) {
    const clue = visibleClues.find((c) => c.index === showClueDetail);
    if (!clue) {
      setShowClueDetail(null);
      return null;
    }

    const previousSecrets = visibleClues
      .filter((c) => c.index < showClueDetail && c.mySecret)
      .map((c) => ({
        clueNumber: c.index + 1,
        title: c.title,
        secret: c.mySecret,
      }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={handleBackFromClue}
            className="text-purple-300 hover:text-purple-200 flex items-center gap-2 mb-8 transition-colors"
          >
            ← Back to clues
          </button>

          <div className="text-center mb-8">
            <div className="text-purple-400 font-semibold text-sm mb-2">
              CLUE #{clue.index + 1}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-crimson-text">
              {clue.title}
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">
              📋 Evidence Found
            </h3>
            <p className="text-white text-lg leading-relaxed">
              {clue.description}
            </p>
          </div>

          {clue.mySecret && (
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl p-8 mb-6">
              <h3 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />🤫 Only You Know This
              </h3>
              <p className="text-amber-100 text-lg leading-relaxed italic">
                "{clue.mySecret}"
              </p>
            </div>
          )}

          {previousSecrets.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
                🧩 What You Know So Far
              </h3>
              <p className="text-indigo-200 text-sm mb-4">
                Your secrets from earlier clues that might connect to this one:
              </p>
              <div className="space-y-3">
                {previousSecrets.map((prev) => (
                  <div
                    key={prev.clueNumber}
                    className="bg-indigo-900/30 border border-indigo-500/20 rounded-lg p-4"
                  >
                    <div className="text-indigo-400 text-xs font-semibold mb-1">
                      From Clue #{prev.clueNumber}: {prev.title}
                    </div>
                    <p className="text-indigo-100 text-sm italic">
                      "{prev.secret}"
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-indigo-400/60 text-xs mt-4">
                💡 How do these pieces fit together?
              </p>
            </div>
          )}
        </div>

        <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Game Title */}
        <div className="text-center mb-8">
          <div className="text-purple-400 font-semibold text-sm mb-1">
            {setting}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-crimson-text mb-2">
            {mysteryTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 text-purple-400/60 text-xs mt-2">
            <RefreshCw className="w-3 h-3" />
            <span>Auto-updating — new clues appear automatically</span>
          </div>
        </div>

        {/* Character Card */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-2 border-purple-500/40 rounded-xl p-8 mb-6">
          <div className="text-center mb-4">
            <div className="text-purple-400 text-sm font-semibold mb-1">
              YOU ARE PLAYING
            </div>
            <h2 className="text-3xl font-bold text-white">{character.name}</h2>
            <p className="text-purple-300 text-lg">{character.role}</p>
          </div>

          {character.vibe && (
            <p className="text-center text-fuchsia-200 text-sm mb-4">
              {character.vibe}
            </p>
          )}

          <div className="space-y-3 mt-6">
            {character.publicBio && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <span className="text-purple-300 font-semibold">
                  Public bio:{" "}
                </span>
                <span className="text-purple-100">{character.publicBio}</span>
              </div>
            )}
            <div>
              <span className="text-purple-300 font-semibold">
                Personality:{" "}
              </span>
              <span className="text-purple-100">{character.personality}</span>
            </div>
            <div>
              <span className="text-purple-300 font-semibold">
                Your relationship with the victim:{" "}
              </span>
              <span className="text-purple-100">
                {character.relationshipToVictim}
              </span>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 mt-4">
              <span className="text-amber-300 font-semibold">
                🤫 Your secret:{" "}
              </span>
              <span className="text-amber-100">{character.secret}</span>
            </div>
            {character.willingToShare && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <span className="text-cyan-300 font-semibold">
                  You are willing to share:{" "}
                </span>
                <span className="text-cyan-100">
                  {character.willingToShare}
                </span>
              </div>
            )}
            {character.roleplayNotes?.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-purple-300 font-semibold mb-2">
                  Suggested behavior
                </div>
                <ul className="space-y-1 text-purple-100 text-sm">
                  {character.roleplayNotes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </div>
            )}
            {character.suspicionLevel && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <span className="text-rose-300 font-semibold">
                  How others may see you:{" "}
                </span>
                <span className="text-rose-100">
                  {character.suspicionLevel}
                </span>
              </div>
            )}
          </div>
        </div>

        {character.isVictim && (
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 mb-6">
            <p className="text-slate-100 font-semibold mb-2">
              Theo is a pre-discovery role.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Once the body is discovered, your job is to observe, help the
              atmosphere stay sharp, and only speak again if the host invites a
              flashback moment.
            </p>
          </div>
        )}

        {/* Killer Banner */}
        {isKiller && (
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm border-2 border-red-500/50 rounded-xl p-6 mb-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔪</div>
              <h3 className="text-2xl font-bold text-red-300 mb-2">
                You Are the Killer
              </h3>
              <p className="text-red-200 leading-relaxed">
                You committed the crime! Your goal is to{" "}
                <strong>deflect suspicion</strong> and avoid being caught. Act
                innocent, cast doubt on others, and use your knowledge
                carefully. Don't let the other players figure out it was you!
              </p>
              <div className="mt-4 bg-red-900/30 rounded-lg p-3 border border-red-500/30">
                <p className="text-red-300 text-sm">
                  💡 <strong>Tip:</strong> Mix truth with misdirection. Share
                  some real information to seem helpful, but subtly steer
                  suspicion toward other suspects.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Victim Info */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            The Victim
          </h3>
          <div className="space-y-2">
            <div>
              <span className="text-purple-300 font-semibold">Name: </span>
              <span className="text-white">{victim.name}</span>
            </div>
            <div>
              <span className="text-purple-300 font-semibold">
                Background:{" "}
              </span>
              <span className="text-purple-100">{victim.background}</span>
            </div>
          </div>
        </div>

        {/* Other Characters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            The Suspects
          </h3>
          <div className="flex flex-wrap gap-2">
            {allCharacters.map((c, i) => {
              const isYou = c.name === character.name;
              return (
                <span
                  key={i}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    isYou
                      ? "bg-purple-600/30 text-purple-200 border border-purple-500/50 font-semibold"
                      : "bg-white/5 text-purple-300 border border-white/10"
                  }`}
                >
                  {c.name} {isYou ? "(You)" : ""}{" "}
                  <span className="text-purple-400 text-xs">• {c.role}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Premise */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-3">📖 The Story</h3>
          <p className="text-purple-100 leading-relaxed whitespace-pre-line">
            {premise}
          </p>
        </div>

        {/* Timeline */}
        {timeline && timeline.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Timeline of Events
            </h3>
            <div className="space-y-4">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                    {i < timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-purple-500/30 mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="text-purple-300 font-semibold text-sm">
                      {event.time}
                    </div>
                    <p className="text-purple-100 text-sm">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clues Section */}
        <div ref={cluesSectionRef} className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">🔍 Clues</h3>
          <p className="text-purple-300 text-sm mb-6">
            {cluesRevealed} of {totalClues} clues revealed
          </p>

          {/* Progress bar */}
          <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(cluesRevealed / totalClues) * 100}%` }}
            />
          </div>

          {/* Revealed clues */}
          <div className="space-y-3 mb-6">
            {visibleClues.map((clue) => {
              const isNewClue = newClueFlash === clue.index;
              return (
                <button
                  key={clue.index}
                  onClick={() => setShowClueDetail(clue.index)}
                  className={`w-full backdrop-blur-sm border rounded-xl p-5 hover:bg-white/10 transition-all text-left flex items-center gap-4 ${
                    isNewClue
                      ? "bg-green-500/20 border-green-500/50"
                      : "bg-white/5 border-white/10"
                  }`}
                  style={
                    isNewClue
                      ? { animation: "clue-flash 0.6s ease-in-out 3" }
                      : {}
                  }
                >
                  <div
                    className={`text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                      isNewClue ? "bg-green-600" : "bg-purple-600"
                    }`}
                  >
                    {clue.index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      {clue.title}
                      {isNewClue && (
                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          NEW!
                        </span>
                      )}
                    </h4>
                    <p className="text-purple-300 text-sm truncate">
                      {clue.description}
                    </p>
                  </div>
                  {clue.mySecret && (
                    <div className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-xs font-semibold flex-shrink-0">
                      🤫 Secret
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Locked clues */}
          {hasMoreClues && (
            <div className="space-y-3 mb-6">
              {Array.from({ length: totalClues - cluesRevealed }, (_, i) => (
                <div
                  key={cluesRevealed + i}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 opacity-40"
                >
                  <div className="bg-purple-900 text-purple-500 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-purple-400 font-semibold">
                      Clue #{cluesRevealed + i + 1}
                    </h4>
                    <p className="text-purple-500 text-sm">
                      Waiting for Game Master to reveal...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Waiting for GM */}
          {hasMoreClues && (
            <div className="text-center py-4 bg-purple-900/20 border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-purple-300 text-sm">
                <RefreshCw
                  className="w-4 h-4"
                  style={{ animation: "spin 3s linear infinite" }}
                />
                Waiting for the Game Master to reveal the next clue...
              </div>
              <p className="text-purple-400/60 text-xs mt-2">
                This page updates automatically
              </p>
            </div>
          )}

          {!hasMoreClues && cluesRevealed > 0 && !votingOpen && (
            <div className="text-center py-6 bg-green-900/20 border border-green-500/30 rounded-xl">
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-green-300 font-semibold text-lg">
                All clues revealed!
              </p>
              <p className="text-green-400/70 text-sm mt-1">
                Time to figure out who did it. Good luck, detective!
              </p>
            </div>
          )}
        </div>

        {/* Voting Section */}
        {votingOpen && character.canVote !== false && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🗳️</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Cast Your Vote
                </h3>
                <p className="text-amber-200">
                  Who do you think committed the murder? Select a suspect below.
                </p>
                {myVote && (
                  <p className="text-amber-300/70 text-sm mt-2">
                    You can change your vote until the Game Master closes
                    voting.
                  </p>
                )}
              </div>

              {voteError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-200 text-sm text-center">
                  {voteError}
                </div>
              )}

              <div className="space-y-2">
                {allCharacters
                  .filter((c) => c.name !== character.name)
                  .map((c) => {
                    const isSelected = (selectedVote || myVote) === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => handleVote(c.name)}
                        disabled={submittingVote}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/20"
                            : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                        } disabled:opacity-50`}
                      >
                        <div>
                          <span className="text-white font-semibold">
                            {c.name}
                          </span>
                          <span className="text-purple-400 text-sm ml-2">
                            • {c.role}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                            <Check className="w-4 h-4" />
                            Your vote
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>

              {submittingVote && (
                <div className="flex items-center justify-center gap-2 text-amber-300 text-sm mt-4">
                  <Loader2
                    className="w-4 h-4"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Submitting your vote...
                </div>
              )}
            </div>
          </div>
        )}

        {votingOpen && character.canVote === false && (
          <div className="mb-8 bg-slate-800/70 border border-slate-700 rounded-xl p-6 text-center">
            <p className="text-slate-100 font-semibold mb-2">
              Theo does not participate in the accusation vote.
            </p>
            <p className="text-slate-400 text-sm">
              Observe the final judgment and let the surviving students decide.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes clue-flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
