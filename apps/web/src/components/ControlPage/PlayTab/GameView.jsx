import { PlayCircle, Loader2 } from "lucide-react";
import { CharacterCard } from "./CharacterCard";
import { KillerBanner } from "./KillerBanner";
import { VictimSection } from "./VictimSection";
import { SuspectsSection } from "./SuspectsSection";
import { PremiseSection } from "./PremiseSection";
import { TimelineSection } from "./TimelineSection";
import { CluesSection } from "./CluesSection";
import { VotingSection } from "./VotingSection";

export function GameView({
  gmGameData,
  gmGameLoading,
  handleSelectGmCharacter,
  mysteryId,
  cluesSectionRef,
  onClueClick,
  onSwitchToControl,
  votingOpen,
  gmSelectedVote,
  gmSubmittingVote,
  handleGmVote,
}) {
  if (gmGameLoading && !gmGameData) {
    return (
      <div className="flex items-center justify-center py-12 text-white text-lg gap-3">
        <Loader2
          className="w-6 h-6"
          style={{ animation: "spin 1s linear infinite" }}
        />
        Loading your game view...
      </div>
    );
  }

  if (!gmGameData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">
          Could not load your game data. The character may have been removed.
        </p>
        <button
          onClick={() => {
            handleSelectGmCharacter(null);
            if (typeof window !== "undefined") {
              localStorage.removeItem(`gm-token-${mysteryId}`);
            }
          }}
          className="text-purple-300 underline hover:text-purple-200"
        >
          Pick a different character
        </button>
      </div>
    );
  }

  const {
    character,
    victim,
    totalClues,
    cluesRevealed,
    visibleClues,
    allCharacters,
    isKiller,
    timeline,
    premise,
    myVote,
  } = gmGameData;

  const controlButton = (
    <button
      onClick={onSwitchToControl}
      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 hover:from-green-700 hover:to-emerald-700"
    >
      <PlayCircle className="w-4 h-4" />
      Switch to Control
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            handleSelectGmCharacter(null);
            if (typeof window !== "undefined") {
              localStorage.removeItem(`gm-token-${mysteryId}`);
            }
          }}
          className="text-purple-400 hover:text-purple-300 text-sm underline transition-colors"
        >
          Change character
        </button>
        {controlButton}
      </div>

      <CharacterCard character={character} />

      {isKiller && <KillerBanner />}

      <VictimSection victim={victim} />

      <SuspectsSection
        allCharacters={allCharacters}
        currentCharacterName={character.name}
      />

      <PremiseSection premise={premise} />

      <TimelineSection timeline={timeline} />

      <CluesSection
        ref={cluesSectionRef}
        cluesRevealed={cluesRevealed}
        totalClues={totalClues}
        visibleClues={visibleClues}
        onClueClick={onClueClick}
        onSwitchToControl={onSwitchToControl}
        votingOpen={votingOpen}
      />

      {votingOpen && (
        <VotingSection
          allCharacters={allCharacters}
          currentCharacterName={character.name}
          gmSelectedVote={gmSelectedVote}
          myVote={myVote}
          gmSubmittingVote={gmSubmittingVote}
          handleGmVote={handleGmVote}
        />
      )}
    </div>
  );
}
