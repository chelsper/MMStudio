import { useState } from "react";

export function useVotingControl(mysteryId, refetch) {
  const [togglingVoting, setTogglingVoting] = useState(false);

  const handleToggleVoting = async (open) => {
    setTogglingVoting(true);
    try {
      const response = await fetch(`/api/mysteries/${mysteryId}/voting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ open }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to toggle voting");
      }
      await refetch();
    } catch (err) {
      console.error("Error toggling voting:", err);
      alert(err.message);
    } finally {
      setTogglingVoting(false);
    }
  };

  return { togglingVoting, handleToggleVoting };
}
