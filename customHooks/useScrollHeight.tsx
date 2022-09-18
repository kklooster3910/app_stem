import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

export const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScrollPosChange = throttle(() => {
    setScrollHeight(window.pageYOffset);
  }, 1200);

  useEffect(() => {
    if (global.window) window.addEventListener("scroll", handleScrollPosChange);

    return () => {
      if (global.window)
        window.removeEventListener("scroll", handleScrollPosChange);
    };
    // event listener only added on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrollHeight;
};
