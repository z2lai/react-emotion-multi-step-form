import styled from "@emotion/styled";

const StyledControlWrapper = styled.div`
  margin: 0;
  border: 0;
  padding: 0;
  flex: 1;
  & > legend:first-child,
  & > label:first-child {
    display: block;
    margin-bottom: 0.3125rem;
    padding: 0;
    align-text: left;
    color: grey;
    font-size: 1rem;
  }
`;

export default StyledControlWrapper;
