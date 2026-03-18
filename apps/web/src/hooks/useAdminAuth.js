import { useState, useEffect } from "react";

export function useAdminAuth(user, userLoading) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (userLoading || !user) return;
    fetch("/api/admin")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
          setStats(data.stats);
        }
      })
      .catch(() => setIsAdmin(false));
  }, [user, userLoading]);

  return { isAdmin, stats };
}
