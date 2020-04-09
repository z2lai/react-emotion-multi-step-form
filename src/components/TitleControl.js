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

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 1.125rem;
`

const StyledTitle = styled.span`
  opacity: 0.7;
  color: hsl(0, 0%, 93%);
  ${props => props.active ? `
    opacity: 1;
    color: hsl(0, 0%, 13%);  
    transition: all 1200ms;
    ` : `  
  `}
`;

const Title = props => (
  <StyledTitle active={props.active}>
    {props.title}
  </StyledTitle>
)

const TitleControl = props => (
  <TitleWrapper>
    <Title title={'Input the URL to the Article'} active={props.page === 1} />
    <Title title={'Select the Resource Type'} active={props.page === 2} />
    <Title title={'Select the Relevant Article Tags'} active={props.page === 3} />
  </TitleWrapper>
);

export default TitleControl;
