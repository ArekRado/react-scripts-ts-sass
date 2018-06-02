import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'

export interface Classes {
  container: string,
  label: string,
  input: string,
  hasError: string,
  errorFeedback: string,
}

export interface InputDefaultProps {
  disabled?: boolean,
  placeholder?: string,
  classes?: Classes,
  isColumn?: boolean,
}

export interface InputProps extends React.InputHTMLAttributes<any>, WrappedFieldProps, InputDefaultProps {
  id: string,
  isColumn?: boolean,
}
