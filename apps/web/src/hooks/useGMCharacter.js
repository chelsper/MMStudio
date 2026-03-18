import { useState, useEffect } from "react";

export function useGMCharacter(mysteryId, activeTab) {
  const [gmCharacterToken, setGmCharacterToken] = useState(null);
  const [gmGameData, setGmGameData] = useState(null);
  const [gmGameLoading, setGmGameLoading] = useState(false);

  // Load GM character token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`gm-token-${mysteryId}`);
      if (saved) setGmCharacterToken(saved);
    }
  }, [mysteryId]);

  // Fetch GM game data when token is set and tab is "play"
  useEffect(() => {
    if (!gmCharacterToken || activeTab !== "play") return;

    const fetchGmGame = async () => {
      setGmGameLoading(true);
      try {
        const response = await fetch(`/api/play/${gmCharacterToken}`);
        if (!response.ok) {
          setGmCharacterToken(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem(`gm-token-${mysteryId}`);
          }
          return;
        }
        const data = await response.json();
        setGmGameData(data);
      } catch (err) {
        console.error("Error loading GM game data:", err);
      } finally {
        setGmGameLoading(false);
      }
    };

    fetchGmGame();
    const interval = setInterval(fetchGmGame, 5000);
    return () => clearInterval(interval);
  }, [gmCharacterToken, activeTab, mysteryId]);

  const handleSelectGmCharacter = (token) => {
    setGmCharacterToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem(`gm-token-${mysteryId}`, token);
    }
  };

  return {
    gmCharacterToken,
    gmGameData,
    gmGameLoading,
    handleSelectGmCharacter,
    setGmCharacterToken,
  };
}
