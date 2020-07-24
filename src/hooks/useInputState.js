import { useState, useEffect, useContext } from "react";
import { InputsContext } from "../context/InputsContext";

const useInputState = (name, initialValue, handleChange) => {
  console.log('useInputState called!');
  const { getInput } = useContext(InputsContext);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log(`useInputs effect called for ${name}`);
    if (handleChange) handleChange(value);
    const input = getInput(name);
    if (input) {
      console.log('input to be updated with:');
      console.log(value);
      input.value = value;
    }
  }, [value])

  return {
    value,
    setValue,
  }
}

export default useInputState;