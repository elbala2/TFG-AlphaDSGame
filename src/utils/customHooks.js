import { useState, useEffect } from "react";

export function useIsMount() {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
    return () => setIsMount(false);
  }, []);

  return isMount;
}