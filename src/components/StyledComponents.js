import styled from "@emotion/styled";
/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
const dynamicStyles = props =>
  css`
    color: ${props.checked ? 'black' : 'grey'};
    background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
  `
*/

export const StyledForm = styled.div`
  margin: 100px auto;
  box-sizing: content-box;
  width: 900px;
  height: 500px;
  border: 3px double hsl(0, 0%, 13%); 
  text-align: center;
  perspective: 800px;
  ${props => `background: ${props.theme.colors.light.turqoise};`}
  &:after {
    content: " 🦄";
  }
`

export const Heading = styled.h1`
  margin: 50px 0 15px 0;
  font-size: 1.875rem;
`

export const TitleContainer = styled.div`
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
export const ErrorMessage = styled.div`
  margin: 0 auto 5px auto;
  height: 20px;
  line-height: 20px;
  font-size: 1.125rem;
  color: hsl(16, 100%, 40%);
`

export const IconContainer = styled.div`
  height: 40px;
  width: 34px;
  overflow: hidden;
`

export const IconsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  line-height: 40px;
  transition: top 300ms ease-out;
  top: ${props => 0 + props.index * -40}px;
`

export const InputContainer = styled.div`
  position: relative;
  margin: 0 8px;
  height: ${props => props.inputContainerHeight ? props.inputContainerHeight : '40'}px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
`

export const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  outline: none;
  color: ${props => props.theme.colors.extraDark.indigo};
  transition: border-color 0.15s ease-in-out;
  &:focus {
    border-color: ${props => props.theme.colors.light.indigo};
    box-shadow: 0 0 0 0.2rem rgba(166, 0, 255, .25);
  }
`;

export const SubmitLabel = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  &:before {
    content: "Submit";
    position: absolute;
    top: 6px;
    left: -35px;
    transition: opacity 400ms ease-in-out, transform 400ms ease-in-out;
    ${props => props.isSubmitPage ? `
      opacity: 1;
      visibility: visible;
    ` : `
      opacity: 0;
      visibility: hidden;
      transform: translateX(-60px);
    `}
  }
`

export const NextButton = styled.button`
  position: relative;
  height: 40px;
  width: 34px;
  border: 0;
  padding: 0;
  background: none;
  transition: transform 300ms;
  cursor: pointer;
  &:hover {
    background: hsl(0, 0%, 90%);
    border-radius: 3px;
    transition: background 300ms ease, transform 300ms;
  }
  &:active, &.active {
    top: 2px;
    background-color: hsl(0, 0%, 100%);
    transition-property: none;
  }
  &:disabled {
    transform: rotate(-90deg);
    top: -2px;
    pointer-events: none;
  }
`

export const NextButtonIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 17px;
  background: hsl(0, 0%, 20%);
  &::before {
    content: '';
    position: absolute;
    left: -3px;
    bottom: 1px;
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: hsl(0, 0%, 20%);
  }
`