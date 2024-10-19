"use client";

const useIsMobile = () => {
  if (!window || !document) {
    return false;
  }
  return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(
    navigator?.userAgent
  );
};

export default useIsMobile;
