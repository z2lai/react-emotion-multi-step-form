import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/** @jsx jsx */

/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

const StyledTitle = styled.span`
  font-size: 1.25rem;
  ${props => props.active ? `
    opacity: 1;
    color: ${props.theme.colors.black};  
    transition: all 1200ms;
  ` : `  
    opacity: 0.5;
    color: ${props.theme.colors.white};  
  `}
`;

const Title = props => (
  <StyledTitle active={props.active}>
    {props.value}
  </StyledTitle>
)

export default Title;
