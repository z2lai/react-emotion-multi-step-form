import { useState, useEffect, useContext } from "react";

import { FormContext } from "./FormContext";

const useInputState = (name, initialValue) => {
  // console.log('useInputState called!');
  const { getInput } = useContext(FormContext);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // console.log(`useInputs effect called for ${name}`);
    const input = getInput(name);
    if (input) {
      // console.log('input to be updated with:');
      // console.log(value);
      input.value = value;
    }
  }, [value, getInput, name])

  return {
    value,
    setValue,
  }
}

export default useInputState;