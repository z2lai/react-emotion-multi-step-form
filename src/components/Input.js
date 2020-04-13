import styled from "@emotion/styled";

export const StyledInputWrapper = styled.div`
  width: 100%
  max-width: 500px;
  min-height: 40px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  ${props => props.active ? `
    visibility: visible;
    opacity: 1;
    transition: opacity 600ms;
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
  padding: 0 0 0 5px;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  letter-spacing: 1px;
  color: hsl(0, 0%, 20%);
`;