/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Typeahead, Hint, Input, Token } from 'react-bootstrap-typeahead';

import { InputWrapper } from './StyledComponents';
import Checkbox from './Checkbox';

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
  .rbt-input-multi.focus {
    background-color: #fff;
    border-color: #80bdff;
    box-shadow: 0 0 0 0 .2rem rgba(0, 123, 255, 0.25);
    color: #495057;
    outline: 0;
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
`

const Divider = styled.div`
  width: 100%;
  margin-top: -5px;
  &:before {
    content: '';
    display: block;
    transform: scaleX(0);
    transition: transform 400ms ease-in-out;
    ${props => `
      border-bottom: solid 1px ${props.theme.colors.black};
      ${props.active ? "transform: scaleX(1)" : ""};
    `}
  }
`

const CheckBoxSection = styled.div`
  height: 180px;
  width: 100%;
  overflow: auto
`

const GroupContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 10px;
`

const GroupHeading = styled.div`
  margin: 10px 0 5px 0;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: capitalize;
`

const CheckboxWrapper = styled.div`
  flex: 1 1 50%;
  margin: 3px 0;
  padding: 0 2px;
`

const CheckboxControl = ({ active, name, options, tags, setTags }) => {
  const [filter, setFilter] = useState(''); // create custom hook to debounce
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selected, setSelected] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const typeaheadRef = useRef();
  const inputWrapperRef = useRef();
  const inputNodeRef = useRef();
  const _handleKeyDown = useRef();
  
  // Move this into useEffect hook for loading tag options
  const optionsArray = options.groups.slice(1, options.groups.length).flat()
  // const optionsArray = filteredOptions.groups.flat();
  const { groupHeadings, groups } = options;
  const BACKSPACE = 8;
  const TAB = 9;
  const RETURN = 13;
  const ESC = 27;
  const SPACE = 32;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const handleInputChange = inputValue => {
    console.log("Input Changed")
    setActiveIndex(-1);
    updateFilter(inputValue);
  }

  const updateFilter = (inputValue, s = selected) => {
    console.log(`Filter updated to: ${inputValue}`)
    console.log(s);
    const filter = inputValue.trim();
    setFilter(filter);
    if (filter === '') {
      setFilteredOptions(options);
      return;
    }
    const filteredGroupHeadings = [];
    const filteredGroups = [];
    for (let i = 1; i < groupHeadings.length; i++) { // skip index 0 to exclude "Suggested" group
      const filteredGroup = groups[i].filter(option => (
        option.toLowerCase().includes(filter) && !s.includes(option)
      ))
      if (filteredGroup.length > 0) {
        filteredGroupHeadings.push(groupHeadings[i]);
        filteredGroups.push(filteredGroup);
      }
    };
    setFilteredOptions({ groupHeadings: filteredGroupHeadings, groups: filteredGroups });
  }

  const handleInputSelection = newSelected => {
    console.log('Selected Changed');
    if (newSelected.length > selected.length) {
      handleInputChange('');
    }
    setSelected(newSelected);
  }

  const handleInputRemove = tag => {
    console.log('Remove Handled');
    const newSelected = [...selected]
    newSelected.splice(newSelected.indexOf(tag), 1);
    updateFilter(inputNodeRef.current.value, newSelected)
    setSelected(newSelected);
    typeaheadRef.current.focus();
  }

  const handleCheckboxChange = event => {
    const selection = event.target.value;
    const checked = event.target.checked;
    const newSelected = [...selected]
    if (checked) {
      newSelected.push(selection);
      typeaheadRef.current.clear()
      handleInputChange('');
    } else {
      newSelected.splice(newSelected.indexOf(selection), 1);
    }
    setSelected(newSelected);
    typeaheadRef.current.focus();
  }

  const updateActiveIndex = (currentIndex, keyCode, items) => {
    let newIndex = currentIndex;
    newIndex += keyCode === UP ? -1 : 1;
    if (newIndex === items.length) {
      newIndex = -1;
    } else if (newIndex === -2) {
      newIndex = items.length - 1;
    }
    setActiveIndex(newIndex);
  }

  // This function is only called once on initial render to override typeahead's internal _handleKeyDown method
  const handleKeyDownOverride = event => {
    // console.log(selected);
    // console.log(typeahead.current.state.activeIndex);
    // console.log(typeahead.current.items);
    // console.log("activeIndex: ")
    // console.log(activeIndex);
    // console.log(typeahead.current.state.text);

    const inputNode = event.currentTarget;
    switch (event.keyCode) {
      case BACKSPACE:
        if (inputNode.value.length === 0 && typeaheadRef.current.props.selected.length) {
          // Prevent browser from going back.
          event.preventDefault();
          // If the input is selected and there is no text, focus the last
          // token when the user hits backspace.
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
    };
    return _handleKeyDown.current(event);
  }

  useEffect(() => {
    _handleKeyDown.current = typeaheadRef.current._handleKeyDown
  // Only need to override ._handleKeyDown once on initial render as the typeahead component (object) imported from the library
  // does not change for each render, hence keeps the same methods throughout its lifecycle
    typeaheadRef.current._handleKeyDown = handleKeyDownOverride; 
    inputNodeRef.current = typeaheadRef.current.getInput();
  }, []);

  // useEffect(() => {
  //   console.log(selected);
  //   typeahead.current._handleKeyDown = overrideHandleKeyDown;
  // }, [typeahead]);

  // const handleBackspace = function (e, onKeyDown) {
  //   console.log("HandleBackspace!");
  //   console.log(e.currentTarget);
  //   if (e.keyCode === BACKSPACE && wrapperRef.current) {
  //     const { children } = wrapperRef.current;
  //     const lastToken = children[children.length - 2];
  //     lastToken && lastToken.focus();
  //   }
  //   onKeyDown(e);
  // }

  let optionsIndexCounter = -1;

  return (
    <InputWrapper active={active}>
      <StyledTypeahead // https://github.com/ericgio/react-bootstrap-typeahead/blob/1cf74a4e3f65d4d80e992d1f926bfaf9f5a349bc/src/components/Typeahead.react.js
        id="typeahead"
        maxHeight="100px"
        autoFocus
        clearButton
        multiple
        options={optionsArray}
        onInputChange={inputValue => handleInputChange(inputValue)} // only includes input changes directly from keyboard keys
        // onKeyDown={e => console.log('onKeyDown Prop!')}
        minLength={1}
        onChange={selected => handleInputSelection(selected)}
        selected={selected}
        // onFocus={e => console.log(`Focus on ${e}`)}
        onBlur={() => typeaheadRef.current.hideMenu()}
        onMenuToggle={() => setActiveIndex(-1)}
        ref={typeaheadRef}
        renderInput={({ inputRef, referenceElementRef, inputClassName, ...inputProps }, state) => {
          // https://github.com/ericgio/react-bootstrap-typeahead/blob/746f26e5ee33bfdd186d64b03248b361647d834e/src/components/TypeaheadInputMulti.react.js
          return (
            <div className="rbt-input-multi form-control rbt-input" tabIndex="-1" onClick={e => typeaheadRef.current.focus()}>
              <div className="rbt-input-wrapper" ref={inputWrapperRef}>
                {state.selected.map((option, idx) => (
                  <Token key={idx} option={option} onRemove={option => handleInputRemove(option)}>
                    {option}
                  </Token>
                ))}
                <Hint // https://github.com/ericgio/react-bootstrap-typeahead/blob/0c69fcaf308e4053403af8164ebbc242e4d64f3c/src/components/Hint.react.js
                  shouldSelect={(shouldSelect, e) => e.keyCode !== TAB && (e.keyCode === RETURN || shouldSelect)}
                >
                  <Input // https://github.com/ericgio/react-bootstrap-typeahead/blob/746f26e5ee33bfdd186d64b03248b361647d834e/src/components/Input.react.js
                    {...inputProps}
                    // onKeyDown={e => handleBackspace(e, onKeyDown)}
                    ref={element => {
                      inputRef(element);
                      referenceElementRef(element);
                    }}
                  />
                </Hint>
              </div>
            </div>
          );
        }}
      />
      {/* <Divider active={active} /> */}
      <CheckBoxSection>
        {filteredOptions.groupHeadings.map((heading, index) => {
          const groupOptions = filteredOptions.groups[index]
          if (groupOptions.length === 0) {
            return
          } else {
            return (
              <div key={heading}>
                <GroupHeading>
                  {heading}
                </GroupHeading>
                <GroupContainer>
                  {groupOptions.map((option, index) => {
                    optionsIndexCounter++
                    return (
                      <CheckboxWrapper key={option}>
                        <Checkbox
                          name={name}
                          value={option}
                          highlight={filter}
                          focused={optionsIndexCounter === activeIndex}
                          checked={selected.includes(option)}
                          onChange={event => handleCheckboxChange(event)}
                        />
                      </CheckboxWrapper>
                    )
                  })}
                </GroupContainer>
              </div>
            )
          }
        })}
      </CheckBoxSection>
    </InputWrapper>
  )
};

export default CheckboxControl;

/*
// Internal _handleKeyDown method of Typeahead component that is overwritten by handleKeyDownOverride
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