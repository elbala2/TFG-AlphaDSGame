import { useState, useEffect } from "react";

export function useIsMount() {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
    return () => setIsMount(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMount;
}