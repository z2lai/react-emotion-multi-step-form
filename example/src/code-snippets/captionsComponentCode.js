export default `
/* All custom components not defined here are just styled components (Emotion) 
that only contain styling */
const Caption = ({ caption, isActive }) => (
  <StyledCaption isActive={isActive}>
    {caption}
  </StyledCaption>
)

const Captions = ({ callToActionText }) => {
  const { inputs, activeIndex, isSubmitPage } = useInputs();

  return (
    <CaptionsContainer>
      {(inputs.length > 0) ?
        <Fragment>
          {inputs.map((input, index) => (
            <Caption
              key={\`\${index} \${input.name}\`}
              caption={input.caption}
              isActive={index === activeIndex}
            />
          ))}
          <Caption key="CTA" caption={callToActionText} isActive={isSubmitPage} />
        </Fragment>
        : null
      }
    </CaptionsContainer>
  )
}
`