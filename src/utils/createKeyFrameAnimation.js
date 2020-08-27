const ease = (v, pow = 4) => {
  return 1 - Math.pow(1 - v, pow);
}

export const createScaleKeyframeAnimation = (oldSize, newSize) => {
  let { x: oldX, y: oldY } = oldSize;
  let { x: newX, y: newY } = newSize;
  let scaleAnimation = '';
  let inverseScaleAnimation = '';

  for (let step = 0; step <= 100; step++) {
    // Remap the step value to an eased one
    let easedStep = ease(step / 100);

    // Calculate the scale of the element
    const xScale = oldX - (oldX - newX) * easedStep;
    const yScale = oldY - (oldY - newY) * easedStep;

    scaleAnimation += `${step}% {
      transform: scale(${xScale}, ${yScale});
    }`;

    // And now the inverse for its contents
    const invXScale = 1 / xScale;
    const invYScale = 1 / yScale;
    inverseScaleAnimation += `${step}% {
      transform: scale(${invXScale}, ${invYScale});
    }`;

  }

  return { scaleAnimation, inverseScaleAnimation };
}