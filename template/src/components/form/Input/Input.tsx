import * as cn from 'classnames'
import * as React from 'react'
// import { pure } from 'recompose'
import { InputDefaultProps, InputProps } from '../types'
import s from './input.scss'

const defaultClasses = {
  container: '',
  label: '',
  input: '',
  hasError: '',
  errorFeedback: s.errorFeedback,
}

const InputComponent: React.StatelessComponent<InputProps> = ({
  input,
  label,
  type,
  meta: { error, touched },
  disabled,
  placeholder,
  id,
  classes = defaultClasses,
  isColumn,
}) => (
  <div
    className={
      cn(classes.container,
        {
          [classes.hasError]: error && touched,
          [s.isColumn]: isColumn,
        },
      )}
  >
    {label
    && <label
      htmlFor={id}
      className={cn(s.label, classes.label)}
    >
      {label}
    </label>}

    <input
      {...input}
      id={id}
      className={cn(s.input, classes.input)}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
    />

    {(error && touched) &&
    <div className={cn(s.errorFeedback, classes.errorFeedback)}>
      {error}
    </div>}
  </div>
)

InputComponent.defaultProps = {
  classes: defaultClasses,
  disabled: false,
  placeholder: '',
  isColumn: true,
} as InputDefaultProps

export const Input = InputComponent
