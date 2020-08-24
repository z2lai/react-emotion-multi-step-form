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
  width: 40px;
  overflow: hidden;
`

export const IconsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  transition: transform 300ms ease-out;
  transform: ${props => `translateX(${props.index * -40}px)`};
`

export const InputContainer = styled.div`
  position: relative;
  height: ${props => props.inputContainerHeight ? props.inputContainerHeight : '40'}px;
  max-width: 400px;
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
  text-align: left;
  transition: border-color 0.15s ease-in-out;
  &:focus {
    border-color: ${props => props.theme.colors.light.indigo};
    box-shadow: 0 0 0 0.2rem rgba(166, 0, 255, .25);
  }
`;

export const SubmitLabel = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  &::before {
    content: "Submit";
    position: absolute;
    top: -3px;
    left: -30px;
    transition: opacity 400ms ease-in-out, transform 400ms ease-out;
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
  width: 40px;
  border: 0;
  border-radius: 3px;
  padding: 0;
  background: none;
  cursor: pointer;
  transition: transform 200ms ease-in-out;
  @media (hover: hover) {
    &:hover {
      background: hsl(0, 0%, 95%);
      transition: transform 200ms ease-in-out, background 200ms ease;
    }
  }
  &:active, &.active {
    transform: translateX(2px);
    background-color: hsl(0, 0%, 100%);
    transition: none;
  }
  &:disabled {
    right: -350px;
    pointer-events: none;
    transform: translate(-350px, -10px);
    transition: transform 350ms ease-in-out;
  }
`

export const DownButtonIcon = styled.div`
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

export const NextButtonIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17px;
  height: 2px;
  border-radius: 1px;
  background: hsl(0, 0%, 20%);
  &::before {
    content: '';
    position: absolute;
    left: 6px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    transform: rotate(-45deg);
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: hsl(0, 0%, 20%);
  }
`

export const BackButtonIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17px;
  height: 2px;
  border-radius: 1px;
  background: hsl(0, 0%, 20%);
  &::before {
    content: '';
    position: absolute;
    left: 1px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    transform: rotate(45deg);
    border-left: 2px solid;
    border-bottom: 2px solid;
    border-color: hsl(0, 0%, 20%);
  }
`