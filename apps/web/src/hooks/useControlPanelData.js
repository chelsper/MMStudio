import { useState, useEffect, useCallback } from "react";

export function useControlPanelData(mysteryId) {
  const [mystery, setMystery] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [voting, setVoting] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/mysteries/${mysteryId}`);
      if (!response.ok) throw new Error("Failed to load mystery");

      const data = await response.json();
      if (data.success) {
        setMystery(data.mystery);
        setAssignments(data.assignments || []);
        setVoting(data.voting || null);
      }
    } catch (err) {
      console.error("Error loading mystery:", err);
    } finally {
      setLoading(false);
    }
  }, [mysteryId]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { mystery, assignments, voting, loading, refetch: fetchData };
}
