export const calculateCollapsedScale = (collapsedBoundingClientRect, expandedBoundingClientRect) => {
  return {
    x: collapsedBoundingClientRect.width / expandedBoundingClientRect.width,
    y: collapsedBoundingClientRect.height / expandedBoundingClientRect.height
  };
}

const ease = (v, pow = 4) => {
  return 1 - Math.pow(1 - v, pow);
}

export const createScaleKeyframeAnimation = scale => {
  // Figure out the size of the element when collapsed.
  let { x, y } = scale;
  let animation = '';
  let inverseAnimation = '';

  for (let step = 0; step <= 100; step++) {
    // Remap the step value to an eased one.
    let easedStep = ease(step / 100);

    // Calculate the scale of the element.
    const xScale = 1 - (1 - x) * easedStep;
    const yScale = 1 - (1 - y) * easedStep;

    animation += `${step}% {
      transform: scale(${xScale}, ${yScale});
    }`;

    // And now the inverse for the contents.
    const invXScale = 1 / xScale;
    const invYScale = 1 / yScale;
    inverseAnimation += `${step}% {
      transform: scale(${invXScale}, ${invYScale});
    }`;

  }

  return animation;

  // @keyframes menuContentsAnimation {
  //   ${inverseAnimation}
  // };
}