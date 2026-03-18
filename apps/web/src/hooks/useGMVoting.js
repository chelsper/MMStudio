import { useState, useEffect } from "react";

export function useGMVoting(gmCharacterToken, gmGameData) {
  const [gmSelectedVote, setGmSelectedVote] = useState(null);
  const [gmSubmittingVote, setGmSubmittingVote] = useState(false);

  useEffect(() => {
    if (gmGameData?.myVote && !gmSelectedVote) {
      setGmSelectedVote(gmGameData.myVote);
    }
  }, [gmGameData, gmSelectedVote]);

  const handleGmVote = async (characterName) => {
    if (!gmCharacterToken) return;
    setGmSelectedVote(characterName);
    setGmSubmittingVote(true);
    try {
      const response = await fetch(`/api/play/${gmCharacterToken}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votedFor: characterName }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to vote");
      }
    } catch (err) {
      console.error("Error GM voting:", err);
    } finally {
      setGmSubmittingVote(false);
    }
  };

  return { gmSelectedVote, gmSubmittingVote, handleGmVote, setGmSelectedVote };
}
