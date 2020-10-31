export default 
`const App = () => {
  const { error } = useInputs();

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <h1>
        Newsletter Subscription
      </h1>
      <Captions callToActionText="Get the latest news straight to your inbox!" />
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <ComboboxMulti
          name="interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          validationRules={{ required: 'Please select a Topic' }}
          height={240}
          options={options}
        />
        <RadioControl
          name="frequency"
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
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <div className="error-message">{error.message}</div>
    </div>
  );
}`