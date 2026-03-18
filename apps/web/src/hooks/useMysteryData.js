import { useState, useEffect, useCallback } from "react";

export function useMysteryData(mysteryId) {
  const [mystery, setMystery] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMystery = useCallback(async () => {
    try {
      // Try loading from DB
      const response = await fetch(`/api/mysteries/${mysteryId}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setMystery({
            id: result.mystery.id,
            config: result.mystery.config,
            data: { mystery: result.mystery.data },
          });
          setAssignments(result.assignments || []);
          setLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      if (typeof window !== "undefined") {
        const mysteries = JSON.parse(localStorage.getItem("mysteries") || "[]");
        const found = mysteries.find((m) => String(m.id) === String(mysteryId));
        if (found) {
          setMystery(found);
          setLoading(false);
          return;
        }
      }

      setError("Mystery not found");
    } catch (err) {
      console.error("Error loading mystery:", err);
      setError("Failed to load mystery");
    } finally {
      setLoading(false);
    }
  }, [mysteryId]);

  useEffect(() => {
    fetchMystery();
  }, [fetchMystery]);

  return { mystery, assignments, loading, error, refetch: fetchMystery };
}
