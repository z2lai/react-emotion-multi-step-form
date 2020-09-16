import React from "react";
import { ThemeProvider } from 'emotion-theming'

import { FormProvider } from '../core/FormContext';

const theme = {
  colors: {
    base: {
      green: 'hsl(120, 75%, 40%)',
      blue: 'hsl(240, 75%, 50%)',
      red: 'hsl(0, 75%, 50%)',
      indigo: 'hsl(279, 75%, 50%)',
      turqoise: 'hsl(139, 75%, 50%)',
    },
    extraDark: {
      indigo: 'hsl(279, 25%, 25%)'
    },
    dark: {
      green: 'hsl(120, 75%, 35%)',
      blue: 'hsl(240, 75%, 35%)',
      red: 'hsl(0, 75%, 35%)',
      indigo: 'hsl(279, 75%, 35%)',
      turqoise: 'hsl(139, 50%, 35%)',
    },
    light: {
      green: 'hsl(120, 50%, 75%)',
      blue: 'hsl(240, 50%, 75%)',
      red: 'hsl(0, 50%, 75%)',
      indigo: 'hsl(279, 75%, 75%)',
      turqoise: 'hsl(139, 50%, 75%)',
    },
    extraLight: {
      green: 'hsl(120, 50%, 90%)',
      blue: 'hsl(240, 50%, 90%)',
      red: 'hsl(0, 50%, 90%)',
      indigo: 'hsl(279, 75%, 95%)',
      turqoise: 'hsl(139, 50%, 90%)',
    },
    white: 'hsl(0, 100%, 99%)',
    black: 'hsl(0, 0%, 25%)',
    grey: 'hsl(0, 0%, 35%)',
    lightGrey: 'hsl(0, 0%, 93%)',
  }
}

const withFormContextAndTheme = Component => (
  props => (
    <FormProvider>
      <ThemeProvider theme={theme}>
        <Component {...props}/>
      </ThemeProvider>
    </FormProvider>
  )
)

export default withFormContextAndTheme;