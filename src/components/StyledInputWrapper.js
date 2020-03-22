import styled from "@emotion/styled";

const StyledInputWrapper = styled.div`
  position: absolute;
  display: flex;
  justify: center;
  width: 500px;
  height: 40px;
  margin: auto;
  ${props => (`
      opacity: ${props.active ? "1" : "0"};
      z-index: ${props.active ? "1" : "-1"};
  `)}
`;

export default StyledInputWrapper;
