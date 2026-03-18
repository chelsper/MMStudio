import { useState } from "react";

export function useCharacterAssignment(mysteryId, onSuccess) {
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState(null);
  const [unassignLoading, setUnassignLoading] = useState(false);
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState("email");

  const assignCharacter = async (characterName) => {
    if (!contact.trim()) return;
    setAssignLoading(true);
    setAssignError(null);

    try {
      const response = await fetch(`/api/mysteries/${mysteryId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterName,
          contact: contact.trim(),
          contactType,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to assign character");
      }

      const result = await response.json();

      const fullUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}${result.shareUrl}`
          : result.shareUrl;

      setContact("");

      if (onSuccess) {
        onSuccess({
          url: fullUrl,
          characterName,
          contact: contact.trim(),
        });
      }

      return { success: true, url: fullUrl };
    } catch (err) {
      console.error("Error assigning character:", err);
      setAssignError(err.message);
      return { success: false, error: err.message };
    } finally {
      setAssignLoading(false);
    }
  };

  const unassignCharacter = async (characterName, onDone) => {
    const confirmed = confirm(
      `Are you sure you want to remove ${characterName}'s assignment?\n\nTheir old link will stop working and you'll need to assign a new player.`,
    );
    if (!confirmed) return;

    setUnassignLoading(true);
    try {
      const response = await fetch(`/api/mysteries/${mysteryId}/assign`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterName }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to unassign character");
      }

      if (onDone) onDone();
    } catch (err) {
      console.error("Error unassigning character:", err);
      alert(err.message);
    } finally {
      setUnassignLoading(false);
    }
  };

  return {
    assignCharacter,
    assignLoading,
    assignError,
    setAssignError,
    contact,
    setContact,
    contactType,
    setContactType,
    unassignCharacter,
    unassignLoading,
  };
}
