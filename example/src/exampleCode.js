export default 
`const Form = () => {
  const { error, isSubmitPage } = useInputs();

  const handleSubmit = payload => {
    console.log('Form submitted with the form fields:');
    console.log(payload);
  };

  return (
    <StyledForm>
      <Heading>
        Newsletter Subscription
      </Heading>
      <Captions callToActionText="Get the latest news straight to your inbox!" />
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <ComboboxMulti
          name="interests"
          label="Interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          height={240}
          validationRules={{ required: 'Please select a Topic' }}
          options={options}
        />
        <RadioControl
          name="frequency"
          label="Frequency"
          caption="How often do you want to receive our newsletter?"
          icon={TreeIcon}
          validationRules={{ required: 'Please select a frequency' }}
        >
          <RadioOption value="daily" />
          <RadioOption value="weekly" />
          <RadioOption value="monthly" />
        </RadioControl>
        <TextInput
          name="email"
          placeholder="example@gmail.com"
          label="Email"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <ErrorMessage>{error.message}</ErrorMessage>
    </StyledForm>
  );
}`