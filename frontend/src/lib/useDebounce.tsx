import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;
export const useDebounce = (value: string, delay = DEFAULT_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};