/** @jsx jsx */
import { useState, useEffect, useRef, useCallback } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import useInputState from "../core/useInputState";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead, Hint, Input, Token } from "react-bootstrap-typeahead";
import InputWrapper from "./InputWrapper";
import Checkbox from "./Checkbox";

import debounce from "../utils/debounce";
import throttle from "../utils/throttle";

const StyledTypeahead = styled(Typeahead)`
  width: 100%;
  #typeahead {
    visibility: hidden;
  }
  ${(props) => `
    .rbt-input-wrapper {
      display: flex;
      width: 100%;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      padding: 0.375rem 0.75rem;
      overflow: hidden;
      align-items: flex-start;
      flex-flow: row wrap;
      font-weight: 400;
      line-height: 26px;
      color: ${props.theme.colors.extraDark.indigo};
      background-color: #fff;
      background-clip: padding-box;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .rbt-input-wrapper.focus {
      border-color: ${props.theme.colors.light.indigo};
      box-shadow: 0 0 0 0.2rem rgba(166, 0, 255, .25);
    }
    input.rbt-input-main {
      background-color: transparent;
      border: 0px;
      box-shadow: none;
      cursor: inherit;
      outline: none;
      padding: 0px;
      width: 100%;
      z-index: 1;
    }
    .rbt-token {
      padding-top: 3px;
      line-height: 1rem;
      background-color: ${props.theme.colors.extraLight.indigo};
      color: ${props.theme.colors.dark.indigo};
    }
    .rbt-token-active {
      background-color: ${props.theme.colors.dark.indigo};
      color: #FFF;
    }
  `}
`;

const CheckboxSectionContainer = styled.div`
  margin-top: 10px;
  flex: 1 1 auto;
  width: 100%;
  height: 60px;
  overflow: auto;
`;

const CheckboxSectionWrapper = styled.div`
  height: auto;
  width: 100%;
  ${(props) => `
    color: ${props.theme.colors.extraDark.indigo};
  `}
`;

const GroupContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 10px;
`;

const GroupHeading = styled.div`
  margin: 0 0 5px 0;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: capitalize;
`;

const CheckboxWrapper = styled.div`
  flex: 1 1 50%;
  margin: 3px 0;
  padding: 0 2px;
`;

const CheckboxMultiControl = ({ name, inputRef: inputRefExternal, options, onChange }) => {
  console.log("CheckboxControl Re-rendered!");
  const [filter, setFilter] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [activeSelectionIndex, setActiveSelectionIndex] = useState(-1);
  const { value: selected, setValue: setSelected } = useInputState(name, []);

  const typeaheadRef = useRef();
  const inputWrapperRef = useRef();
  const inputNodeRef = useRef();
  const _handleKeyDownRef = useRef(); // this variable can be overwritten as handleKeyDown maintains reference to the original _handleKeyDown definition reference due to closure

  const [groupHeadings, groups] = options;
  const optionsArray = groups.flat();
  const [filteredGroupHeadings, filteredGroups] = filteredOptions;
  const BACKSPACE = 8;
  const TAB = 9;
  const RETURN = 13;
  const ESC = 27;
  const UP = 38;
  const DOWN = 40;
  const DEBOUNCETIME = 100;
  const THROTTLEPERIOD = 10;

  const handleInputChange = (inputValue) => {
    console.log("Input Changed");
    console.log(`onInputChange Value: ${inputValue}`);
    console.log(`inputNodeRef Value: ${inputNodeRef.current.value}`);
    setActiveSelectionIndex(-1);
    // Since there's a debounce delay when handleInputChange is called from onInputChange, inputValue might be stale if handleInputChange was called
    // immediately after from a non-debounced handler (e.g. handleInputSelection handles when selection is made on 'Enter' key and sets input value to '').
    // - So it's better to updateFilter with the actual input node value to get the most updated value (uncontrolled input approach with refs)
    //updateFilter(inputNodeRef.current.value)
    // - OR, we can just debounce handleInputChange itself so that it will be debounced regardless of where it is called
    updateFilter(inputValue);
  };
  const debouncedHandleInputChange = debounce(handleInputChange, DEBOUNCETIME);

  const updateFilter = (inputValue, excluded = selected) => {
    const filter = inputValue.trim();
    console.log('updateFilter called - setFilter')
    setFilter(filter);
    if (filter === "") {
      setFilteredOptions(options);
      return;
    }
    const _groupHeadings = [];
    const _groups = [];
    groups.forEach((group, index) => {
      const filteredGroup = group.filter(
        (option) => option.toLowerCase().includes(filter) && !excluded.includes(option)
      );
      if (filteredGroup.length > 0) {
        _groupHeadings.push(groupHeadings[index]);
        _groups.push(filteredGroup);
      }
    });
    setFilteredOptions([_groupHeadings, _groups]);
  };

  const handleSelectionChange = selected => {
    if (onChange) onChange(selected);
    setSelected(selected);
  }

  const handleInputSelection = (newSelected) => {
    console.log("Selected Changed");
    if (newSelected.length > selected.length) {
      debouncedHandleInputChange("");
    }
    handleSelectionChange(newSelected);
  };

  const removeToken = (token, selected) => {
    console.log("Remove Handled");
    const newSelected = [...selected];
    newSelected.splice(newSelected.indexOf(token), 1);
    handleSelectionChange(newSelected);
    if (inputNodeRef.current.value.length > 0) {
      updateFilter(inputNodeRef.current.value, newSelected);
    }
    typeaheadRef.current.focus();
  };
  // In order to throttle removeToken, the returned throttled function (and its closure) has to be memoized so that it can be called
  // by each handleTokenRemove event handler that gets defined on each render
  const memoizedThrottledRemoveToken = useCallback(throttle(removeToken, THROTTLEPERIOD), []);
  // In handleTokenRemove event handler, the throttled and memoized removeToken function is called with the following arguments:
  //  1. "token" from the event listener
  //  2. "selected" from state - this value gets refreshed as handleTokenRemove gets defined on each render
  const handleTokenRemove = (token) => {
    memoizedThrottledRemoveToken(token, selected);
  };

  const handleCheckboxKeyDown = (event) => {
    console.log("KeyDown on Checkbox!");
    if (event.key === "Enter") {
      event.currentTarget.click(); // might need to replace with event.dispatchEvent for IE due to no activeElement API
    }
  };

  const handleCheckboxChange = (event) => {
    const selection = event.target.value;
    const checked = event.target.checked;
    const newSelected = [...selected];
    if (checked) {
      newSelected.push(selection);
      typeaheadRef.current.clear(); // typeaheadRef.current.clear() sets states thus is asynchronous in clearing the input
      debouncedHandleInputChange("");
    } else {
      newSelected.splice(newSelected.indexOf(selection), 1);
    }
    handleSelectionChange(newSelected);
    typeaheadRef.current.focus();
  };

  const updateActiveIndex = (currentIndex, keyCode, items) => {
    let newIndex = currentIndex;
    newIndex += keyCode === UP ? -1 : 1;
    if (newIndex === items.length) {
      newIndex = -1;
    } else if (newIndex === -2) {
      newIndex = items.length - 1;
    }
    setActiveSelectionIndex(newIndex);
  };

  const handleInputWrapperKeyDown = event => {
    console.log('inputWrapperKeyDownHandler called');
    console.log(event.target.type);
     // stop Enter keydown event from triggering FormBody keydown handler if not initiated from text input
    if (event.key === 'Enter' && event.target.type !== 'text') event.stopPropagation();
  }

  // This handler replaces Typeahead's internal onKeyDown handler (which gets passed to the input element) once on initial render
  // so there should be no references to state in here as they will be stale.
  const handleKeyDown = useCallback(event => {
    const inputNode = event.currentTarget;
    switch (event.keyCode) {
      case RETURN:
        console.log("Enter pressed!");
        if (inputNode.value.length > 0) event.stopPropagation(); // stop Enter key from triggering FormBody keydown handler
        break;
      case ESC:
        break;
      case BACKSPACE:
        if (inputNode.value.length === 0 && typeaheadRef.current.props.selected.length) {
          // Prevent browser from going back.
          event.preventDefault();
          // If the input is selected and there is no text, focus the last token when the user hits backspace.
          if (inputWrapperRef.current) {
            const { children } = inputWrapperRef.current;
            const lastToken = children[children.length - 2];
            lastToken && lastToken.focus();
          }
        }
        break;
      case UP:
      case DOWN:
        // Prevent input cursor from going to the beginning when pressing up.
        event.preventDefault();
        // Prevent UP and DOWN from navigating options (Typeahead internal behaviour)
        return;
      case TAB:
        if (typeaheadRef.current.isMenuShown) {
          event.keyCode = event.shiftKey ? UP : DOWN;
          updateActiveIndex(typeaheadRef.current.state.activeIndex, event.keyCode, typeaheadRef.current.items);
        }
        break;
      default:
        break;
    }
    _handleKeyDownRef.current(event);
  }, []);

  const handleClear = () => {
    handleSelectionChange([]);
    typeaheadRef.current.clear();
    typeaheadRef.current.focus();
    debouncedHandleInputChange("");
  };

  const handleFocus = () => {
    inputWrapperRef.current.classList.add("focus");
  };

  const handleBlur = () => {
    typeaheadRef.current.hideMenu(); // disables hidden menu
    inputWrapperRef.current.classList.remove("focus");
  };

  const handleMenuToggle = () => setActiveSelectionIndex(-1);

  // Override typeahead internal methods only once on initial render
  // Typeahead internal methods: https://github.com/ericgio/react-bootstrap-typeahead/blob/1cf74a4e3f65d4d80e992d1f926bfaf9f5a349bc/src/core/Typeahead.js
  useEffect(() => {
    // Keep ._handleKeyDown definition in ref so that handleKeyDown can call it
    _handleKeyDownRef.current = typeaheadRef.current._handleKeyDown;
    // Only need to override internal methods once on initial render as the typeahead component (object) imported from the library
    // does not change for each render - keeps the same methods throughout its lifecycle
    typeaheadRef.current._handleKeyDown = handleKeyDown;
    typeaheadRef.current._handleClear = handleClear;
    inputNodeRef.current = typeaheadRef.current.getInput();
    console.log("CheckboxControl finished rendering!");
  }, [handleKeyDown]);

  useEffect(() => {
    // If there are no filtered options, disable hidden menu to allow TAB to return to default behaviour
    if (filteredGroups.length === 0) typeaheadRef.current.hideMenu();
  }, [filteredGroups]);

  let optionsIndexCounter = -1;
  return (
    <InputWrapper name={name} column onKeyDown={handleInputWrapperKeyDown}>
      <StyledTypeahead
        id="typeahead"
        multiple
        maxHeight="300px"
        clearButton
        options={optionsArray}
        onInputChange={debouncedHandleInputChange} // only handles direct input changes from editing keys - excludes input clear from pressing 'Enter'
        minLength={1} // to activate hidden menu and hint
        selected={selected}
        onChange={handleInputSelection}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMenuToggle={handleMenuToggle}
        ref={typeaheadRef}
        renderInput={({ inputRef, referenceElementRef, inputClassName, ...inputProps }, state) => {
          return (
            <div className="rbt-input-wrapper" ref={inputWrapperRef}>
              {state.selected.map((option, idx) => (
                <Token key={idx} option={option} onRemove={handleTokenRemove}>
                  {option}
                </Token>
              ))}
              <Hint
                shouldSelect={(shouldSelect, e) => e.keyCode !== TAB && (e.keyCode === RETURN || shouldSelect)}
              >
                <Input
                  {...inputProps}
                  name={name} //? this text input shares the same name as the checkbox inputs, does this work?
                  ref={(element) => {
                    inputRef(element);
                    // referenceElementRef(element); // to position the dropdown menu, may be a container element, hence the need for separate refs.
                    inputRefExternal(element);
                  }}
                />
              </Hint>
            </div>
          );
        }}
      />
      <CheckboxSectionContainer>
        <CheckboxSectionWrapper>
          {filteredGroupHeadings.map((heading, index) => {
            if (index === 0) console.log('MemoizedCheckboxSectionWrapper children rendered');
            //? need to refactor this component to prevent unnecessary re-rendering on every state change?
            const filteredGroup = filteredGroups[index];
            if (filteredGroup.length === 0) { // when all options have been filtered out
              return null;
            } else {
              return (
                <div key={heading}>
                  <GroupHeading>{heading}</GroupHeading>
                  <GroupContainer>
                    {filteredGroup.map((option, index) => {
                      optionsIndexCounter++;
                      return (
                        <CheckboxWrapper key={option}>
                          <Checkbox
                            name={name}
                            value={option}
                            checked={selected.includes(option)}
                            onKeyDown={handleCheckboxKeyDown}
                            onChange={handleCheckboxChange}
                            highlightedText={filter}
                            focusState={optionsIndexCounter === activeSelectionIndex}
                          />
                        </CheckboxWrapper>
                      );
                    })}
                  </GroupContainer>
                </div>
              );
            }
          })}
        </CheckboxSectionWrapper>
      </CheckboxSectionContainer>
    </InputWrapper>
  );
};

export default CheckboxMultiControl;