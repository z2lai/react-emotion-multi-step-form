import styled from "@emotion/styled";

export const StyledForm = styled.div`
  box-sizing: content-box;
  width: 900px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 3px double hsl(0, 0%, 13%); 
  transform: translate(-50%, -50%);
  text-align: center;
  ${props => `background: ${props.theme.colors.light.turqoise};`}
  &:after {
    content: " 🦄";
  }
`

export const TitleContainer = styled.div`
  padding: 5px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 1.125rem;
`

export const Heading = styled.h1`
  margin: 50px 0 20px 0;
  font-size: 1.875rem;
`

export const FormBody = styled.div`
  margin: 20px auto;
  width: 500px;
  max-height: 60px;
  padding: 10px 8px;
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 3px;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 8px 10px hsl(120, 60%, 40%);
  text-align: left;
  transition: max-height 400ms ease-out;
  ${props => (props.page === 3) ? "max-height: 240px;" : ""}
  h1 {
    margin: 0;
    padding: 1.5rem 0;
    font-size: 1.125rem;
    text-align: center;
  }
`;

export const IconContainer = styled.div`
  height: 40px;
  width: 34px;
  overflow: hidden;
`

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  line-height: 40px;
  transition: top 300ms ease-out;
  ${props => (
    (props.page === 1) ? `
      top: 0px;
    ` : (props.page === 2) ? ` 
      top: -40px; 
    ` : ` 
      top: -80px;
    `
  )}
`

export const InputContainer = styled.div`
  position: relative;
  margin: 0 8px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
`

export const InputWrapper = styled.div`
  max-width: 500px;
  min-height: 40px;
  max-height: 220px;
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  ${props => props.active ? `
    visibility: visible;
    opacity: 1;
    transition: opacity 600ms ease-out;
  ` : `
    position: absolute;
    visibility: hidden;
    opacity: 0;
  `}
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  padding: 2px 0 0 0;
  outline: none;
  font: inherit;
  letter-spacing: 1px;
`;

export const NextButton = styled.button`
  position: relative;
  height: 40px;
  width: 34px;
  border: 1px black;
  background: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background: hsl(0, 0%, 95%);
    border-radius: 3px;
    transition: background 0.3s ease;
  }
  &:active {
    top: 2px;
    background-color: hsl(0, 0%, 100%);
    transition-property: none;
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