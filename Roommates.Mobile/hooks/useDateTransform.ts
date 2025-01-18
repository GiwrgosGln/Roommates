import { useCallback } from "react";

export const useReadableDate = () => {
  const formatDate = useCallback((isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  return { formatDate };
};
