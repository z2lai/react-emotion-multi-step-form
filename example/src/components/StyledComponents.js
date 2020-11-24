/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
const dynamicStyles = props =>
  css`
    color: ${props.checked ? 'black' : 'grey'};
    background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
  `
*/

export const ShapeDivider = () => (
  <div className="shape-divider">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
    </svg>
  </div>
)

export const StyledForm = styled.div`
  box-sizing: border-box;
  margin: auto;
  max-width: 980px;
  height: 450px;
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px 5px;
  text-align: center;
  background: hsl(139, 50%, 75%);
`

export const Heading = styled.h1`
  position: relative;
  font-size: 1.875rem;
  margin: 5px auto;
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
  height: ${props => props.pageContainerheight ? props.pageContainerheight - 20 : '40'}px;
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
    content: ${props => `'${props.text}'`};
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
  transition: transform 100ms ease-in-out;
  @media (hover: hover) {
    &:hover {
      background: hsl(0, 0%, 95%);
      transition: transform 100ms ease-in-out, background 200ms ease;
    }
  }
  &:active, &.active {
    transform: translateX(2px);
    background-color: hsl(0, 0%, 100%);
    transition: none;
  }
  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.colors.light.indigo};
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