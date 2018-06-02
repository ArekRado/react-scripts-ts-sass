import { Pizza } from 'components/App/types'
import { Input } from 'components/form/Input'
import * as React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ApiProps } from 'utils/withApi.hoc'
import s from './search.scss'
import '../redux/home.epic'

const classes = {
  container: s.container,
  input: s.input,
}

const SearchComponent: React.StatelessComponent<ApiProps<Pizza[]> & InjectedFormProps> = ({
  data,
}) => (
  <Field
    component={Input as any}
    name='text'
    type='text'
    id='text'
    placeholder='Find pizza'
    classes={classes}
  />
)

export const Search = reduxForm({
  form: 'search',
})(SearchComponent)
