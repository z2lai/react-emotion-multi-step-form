import styled from "@emotion/styled";

const StyledInputWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  transition: opacity 600ms;
  ${props => props.active ? `
    visibility: visible;
    opacity: 1;
    ` : `
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 600ms,
  `}
`;

export default StyledInputWrapper;