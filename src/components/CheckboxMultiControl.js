import React, { useState, useEffect, useRef, useCallback } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import useInputState from "../hooks/useInputState";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead, Hint, Input, Token } from "react-bootstrap-typeahead";
// Typeahead Components: https://github.com/ericgio/react-bootstrap-typeahead/blob/1cf74a4e3f65d4d80e992d1f926bfaf9f5a349bc/src/components/Typeahead.react.js
// Typeahead internal methods: https://github.com/ericgio/react-bootstrap-typeahead/blob/1cf74a4e3f65d4d80e992d1f926bfaf9f5a349bc/src/core/Typeahead.js
import InputWrapper from "./InputWrapper";
import Checkbox from "./Checkbox";
import withLog from "./withLog";

import debounce from "../utils/debounce";
import throttle from "../utils/throttle";


/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

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

const Divider = styled.div`
  width: 100%;
  margin-top: -5px;
  &:before {
    content: "";
    display: block;
    transform: scaleX(0);
    transition: transform 400ms ease-in-out;
    ${(props) => `
      border-bottom: solid 1px ${props.theme.colors.black};
      ${props.active ? "transform: scaleX(1)" : ""};
    `}
  }
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

const MemoizedCheckboxSectionWrapper = React.memo(CheckboxSectionWrapper);

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
  // const [selected, setSelected] = useState([]);
  const { value: selected, setValue: setSelected } = useInputState(name, [], onChange);

  const typeaheadRef = useRef();
  const inputWrapperRef = useRef();
  const inputNodeRef = useRef();
  const _handleKeyDownRef = useRef(); // this variable can be overwritten as handleKeyDown maintains reference to the original _handleKeyDown definition reference due to closure

  // useImperativeHandle(ref, () => ({
  //   focus: () => {
  //     inputNodeRef.current.focus()
  //   }
  // }));

  const [groupHeadings, groups] = options;
  const optionsArray = groups.flat();
  const [filteredGroupHeadings, filteredGroups] = filteredOptions;
  // const optionsArray = filteredOptions.groups.flat();
  const BACKSPACE = 8;
  const TAB = 9;
  const RETURN = 13;
  const ESC = 27;
  const UP = 38;
  const DOWN = 40;
  const DEBOUNCETIME = 100;
  const THROTTLEPERIOD = 10;

  // useEffect(() => {
  //   if (active) {
  //     // Delay focus until after FormBody has finished height transition, otherwise the content won't be properly positioned
  //     // at the start of the transition and will shift during transition
  //     setTimeout(() => inputNodeRef.current.focus(), 400);
  //   }
  // }, [active]);

  // This effect has been moved to useInputs to be reused by all input components
  // useEffect(() => {
  //   onChange(selected); //! this is being called on initial render which triggers a re-render of formBody and the entire tree
  //   console.log('Tags set!');
  // }, [selected]);

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
    // console.log(`Filter updated to: ${inputValue}`)
    // console.log(excluded);
    const filter = inputValue.trim();
    setFilter(filter);
    if (filter === "") {
      setFilteredOptions(options);
      return;
    }
    const _groupHeadings = [];
    const _groups = [];
    groups.forEach((group, index) => {
      // skip index 0 to exclude "Suggested" group
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

  const handleInputSelection = (newSelected) => {
    console.log("Selected Changed");
    if (newSelected.length > selected.length) {
      debouncedHandleInputChange("");
    }
    setSelected(newSelected);
  };

  const removeToken = (token, selected) => {
    console.log("Remove Handled");
    const newSelected = [...selected];
    newSelected.splice(newSelected.indexOf(token), 1);
    setSelected(newSelected);
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
      event.stopPropagation();
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
    setSelected(newSelected);
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

  // Example from github issues: https://github.com/ericgio/react-bootstrap-typeahead/issues/461
  // This handler replaces Typeahead's internal onKeyDown handler (which gets passed to the input element) once on initial render
  // so there should be no references to state in here as they will be stale.
  const handleKeyDown = (event) => {
    // console.log(typeahead.current.state.text);
    // console.log(typeahead.current.items);
    // console.log(typeahead.current.state.activeIndex);
    const inputNode = event.currentTarget;
    switch (event.keyCode) {
      case RETURN:
        console.log("Enter pressed!");
        if (inputNode.value.length > 0) event.stopPropagation(); // stop Enter key from triggering FormBody keydown handler
        break;
      //   // Synthetic events are reused for performance reasons, then they are released/nullified. To keep the original synthetic event
      //   // around, use event.persist(). See https://fb.me/react-event-pooling for more information.
      //   event.persist()
      //   // Delay the Enter key from selecting until after the input has finished handling the debounced typing events logic moved to handleInputChange
      //   setTimeout(() => {
      //     console.log("Enter triggered!")
      //     _handleKeyDownRef.current(event)
      //   }, DEBOUNCETIME + 3000);
      //   return;
      case ESC:

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
        // Prevent UP and DOWN from navigating options (Typeahead default)
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
    _handleKeyDownRef.current(event); // definition of _handleKeyDownRef at the bottom of this file
  };

  const handleClear = () => {
    setSelected([]);
    typeaheadRef.current.clear();
    debouncedHandleInputChange("");
  };

  const handleFocus = () => {
    inputWrapperRef.current.classList.add("focus");
  };

  const handleBlur = () => {
    typeaheadRef.current.hideMenu(); // toggles hidden menu
    inputWrapperRef.current.classList.remove("focus");
  };

  const handleMenuToggle = () => setActiveSelectionIndex(-1);

  // Override typeahead internal methods only once on initial render
  useEffect(() => {
    // Keep ._handleKeyDown definition in ref so that handleKeyDown can call it (see its definition at the end of file)
    _handleKeyDownRef.current = typeaheadRef.current._handleKeyDown;
    // Only need to override internal methods once on initial render as the typeahead component (object) imported from the library
    // does not change for each render - keeps the same methods throughout its lifecycle
    typeaheadRef.current._handleKeyDown = handleKeyDown;
    typeaheadRef.current._handleClear = handleClear;
    inputNodeRef.current = typeaheadRef.current.getInput();
    console.log("CheckboxControl finished rendering!");
  }, []);

  let optionsIndexCounter = -1;
  return (
    <InputWrapper name={name} column>
      <StyledTypeahead
        id="typeahead"
        multiple
        // maxHeight="1px"
        // dropup
        clearButton
        options={optionsArray}
        // onKeyDown={e => console.log('onKeyDown Prop!')}
        onInputChange={debouncedHandleInputChange} // only handles direct input changes from editing keys - excludes input clear from pressing 'Enter'
        minLength={1} // to activate menu/hint
        selected={selected}
        onChange={handleInputSelection}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMenuToggle={handleMenuToggle}
        ref={typeaheadRef}
        renderInput={({ inputRef, referenceElementRef, inputClassName, ...inputProps }, state) => {
          // https://github.com/ericgio/react-bootstrap-typeahead/blob/746f26e5ee33bfdd186d64b03248b361647d834e/src/components/TypeaheadInputMulti.react.js
          return (
            <div className="rbt-input-wrapper" ref={inputWrapperRef}>
              {state.selected.map((option, idx) => (
                <Token key={idx} option={option} onRemove={handleTokenRemove}>
                  {option}
                </Token>
              ))}
              <Hint // https://github.com/ericgio/react-bootstrap-typeahead/blob/0c69fcaf308e4053403af8164ebbc242e4d64f3c/src/components/Hint.react.js
                shouldSelect={(shouldSelect, e) => e.keyCode !== TAB && (e.keyCode === RETURN || shouldSelect)}
              >
                <Input // https://github.com/ericgio/react-bootstrap-typeahead/blob/746f26e5ee33bfdd186d64b03248b361647d834e/src/components/Input.react.js
                  {...inputProps}
                  name={name} //? this text input shares the same name as the checkbox inputs, does this work?
                  ref={(element) => {
                    inputRef(element);
                    inputRefExternal(element);
                    // referenceElementRef(element); to position the menu, may be a container element, hence the need for separate refs.
                  }}
                />
              </Hint>
            </div>
          );
        }}
      />
      {/* <Divider active={active} /> */}
      <CheckboxSectionContainer>
        <MemoizedCheckboxSectionWrapper>
          {filteredGroupHeadings.map((heading, index) => {
            // need to refactor this component to prevent unnecessary re-rendering on every state change
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
        </MemoizedCheckboxSectionWrapper>
      </CheckboxSectionContainer>
    </InputWrapper>
  );
};

export default CheckboxMultiControl;

/*
// Internal _handleKeyDown method of Typeahead component that is overwritten by handleKeyDown
// and called at the end of the function:
 _handleKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { activeItem } = this.state;

    // Skip most actions when the menu is hidden.
    if (!this.isMenuShown) {
      if (e.keyCode === UP || e.keyCode === DOWN) {
        this.setState({ showMenu: true });
      }

      this.props.onKeyDown(e);
      return;
    }

    switch (e.keyCode) {
      case UP:
      case DOWN:
        // Prevent input cursor from going to the beginning when pressing up.
        e.preventDefault();
        this._handleActiveIndexChange(getUpdatedActiveIndex(
          this.state.activeIndex,
          e.keyCode,
          this.items
        ));
        break;
      case RETURN:
        // Prevent form submission while menu is open.
        e.preventDefault();
        activeItem && this._handleMenuItemSelect(activeItem, e);
        break;
      case ESC:
      case TAB:
        // ESC simply hides the menu. TAB will blur the input and move focus to
        // the next item; hide the menu so it doesn't gain focus.
        this.hideMenu();
        break;
      default:
        break;
    }

    this.props.onKeyDown(e);
  }
*/