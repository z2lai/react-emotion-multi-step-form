export default `
<FormBody onSubmit={handleSubmit}>
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
`