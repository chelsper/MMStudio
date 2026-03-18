import { useState } from "react";

export function useClueReveal(mysteryId, refetch) {
  const [revealing, setRevealing] = useState(false);

  const handleRevealNext = async (totalCharacters, assignedCharacters) => {
    if (assignedCharacters < totalCharacters) {
      const proceed = confirm(
        `⚠️ Warning: Only ${assignedCharacters} of ${totalCharacters} characters have been assigned to players.\n\n` +
          `If you reveal this clue now, the ${totalCharacters - assignedCharacters} unassigned character(s) won't receive it.\n\n` +
          `Are you sure you want to continue?`,
      );
      if (!proceed) return;
    }

    setRevealing(true);
    try {
      const response = await fetch(
        `/api/mysteries/${mysteryId}/reveal-global`,
        { method: "POST" },
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to reveal clue");
      }
      await refetch();
    } catch (err) {
      console.error("Error revealing clue:", err);
      alert(err.message);
    } finally {
      setRevealing(false);
    }
  };

  return { revealing, handleRevealNext };
}
