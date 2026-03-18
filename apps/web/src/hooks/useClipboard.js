import { useState } from "react";

export function useClipboard(duration = 2000) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
      return true;
    } catch (err) {
      console.error("Copy failed:", err);
      return false;
    }
  };

  return { copied, copyToClipboard };
}
