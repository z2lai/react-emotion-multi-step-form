import { useEffect, useRef } from "react";
import { createScaleKeyframeAnimation } from "../utils/createKeyFrameAnimation";

const useScaleAnimation = (relativeWidth, relativeHeight) => {
  const oldRelativeWidthRef = useRef(1);
  const oldRelativeHeightRef = useRef(1);

  const { scaleAnimation, inverseScaleAnimation } = createScaleKeyframeAnimation(
    { x: oldRelativeWidthRef.current, y: oldRelativeHeightRef.current },
    { x: relativeWidth, y: relativeHeight }
  );

  useEffect(() => {
    oldRelativeWidthRef.current = relativeWidth;
    oldRelativeHeightRef.current = relativeHeight;
  }, [relativeWidth, relativeHeight]);

  return {
    scaleAnimation,
    inverseScaleAnimation,
  }
}

export default useScaleAnimation;