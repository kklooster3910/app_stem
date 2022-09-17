import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

// I'm not sure this is throttling how it's supposed to
export const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScrollPosChange = throttle(() => {
    setScrollHeight(window.pageYOffset);
    // play around with this throttle value to see if you need to make it shorter
  }, 1000);

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
