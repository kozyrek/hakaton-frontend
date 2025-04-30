import { useState, useEffect } from "react";

/**
 * Custom hook that tracks and returns the current window width.
 *
 * @returns {number} Current window width in pixels.
 *
 * @example
 * // Usage in component:
 * const windowWidth = useResize();
 *
 * @description
 * - Automatically updates width value on window resize
 * - Handles event listener cleanup on component unmount
 * - Uses native window.innerWidth for accurate measurement
 * - Optimized with single useEffect and state management
 */

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};
