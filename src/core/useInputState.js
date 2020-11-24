import { useState, useEffect, useContext } from "react";

import { FormContext } from "./FormContext";

const useInputState = (name, initialValue) => {
  const { getInput } = useContext(FormContext);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const input = getInput(name);
    if (input) {
      input.value = value;
    }
  }, [value, getInput, name])

  return {
    value,
    setValue,
  }
}

export default useInputState;