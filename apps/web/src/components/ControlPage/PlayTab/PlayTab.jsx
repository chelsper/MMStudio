import { useState, useEffect } from "react";
import { CharacterSelection } from "./CharacterSelection";
import { ClueDetailView } from "./ClueDetailView";
import { GameView } from "./GameView";

export function PlayTab({
  assignments,
  gmCharacterToken,
  handleSelectGmCharacter,
  gmGameData,
  gmGameLoading,
  showClueDetail,
  setShowClueDetail,
  cluesSectionRef,
  jumpToClues,
  setJumpToClues,
  votingOpen,
  gmSelectedVote,
  gmSubmittingVote,
  handleGmVote,
  setActiveTab,
  mysteryId,
}) {
  useEffect(() => {
    if (jumpToClues && !showClueDetail && cluesSectionRef.current) {
      cluesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setJumpToClues(false);
    }
  }, [jumpToClues, showClueDetail, cluesSectionRef, setJumpToClues]);

  if (!gmCharacterToken) {
    return (
      <CharacterSelection
        assignments={assignments}
        handleSelectGmCharacter={handleSelectGmCharacter}
      />
    );
  }

  if (showClueDetail !== null && gmGameData) {
    const clue = gmGameData.visibleClues.find(
      (c) => c.index === showClueDetail,
    );
    if (!clue) {
      setShowClueDetail(null);
      return null;
    }

    return (
      <ClueDetailView
        clue={clue}
        visibleClues={gmGameData.visibleClues}
        onBack={() => {
          setShowClueDetail(null);
          setJumpToClues(true);
        }}
        onSwitchToControl={() => {
          setActiveTab("control");
          setShowClueDetail(null);
        }}
      />
    );
  }

  return (
    <GameView
      gmGameData={gmGameData}
      gmGameLoading={gmGameLoading}
      handleSelectGmCharacter={handleSelectGmCharacter}
      mysteryId={mysteryId}
      cluesSectionRef={cluesSectionRef}
      onClueClick={setShowClueDetail}
      onSwitchToControl={() => {
        setActiveTab("control");
        setShowClueDetail(null);
      }}
      votingOpen={votingOpen}
      gmSelectedVote={gmSelectedVote}
      gmSubmittingVote={gmSubmittingVote}
      handleGmVote={handleGmVote}
    />
  );
}
