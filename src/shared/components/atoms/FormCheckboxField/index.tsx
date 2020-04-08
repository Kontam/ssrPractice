import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Field } from 'redux-form';

const renderCheckbox = ({ input, color }: any) => (
  <Checkbox
    checked={input.value ? true : false}
    onChange={input.onChange}
    color={color}
  />
)

type Props = {
  name: string,
  color: string,
}

const FormCheckbox = ({ name, color }: Props) => (
  <Field 
    name={name}
    component={renderCheckbox} 
    color={color}
  />
);

export default FormCheckbox;
