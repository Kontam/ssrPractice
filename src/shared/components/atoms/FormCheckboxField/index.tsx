import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Field } from 'redux-form';

const renderCheckbox = ({ input, color, size }: any) => (
  <Checkbox
    checked={input.value ? true : false}
    onChange={input.onChange}
    color={color}
    size={size}
  />
)

type Props = {
  name: string,
  color: string,
  size?: string,
}

const FormCheckbox = ({ name, color, size }: Props) => (
  <Field 
    name={name}
    component={renderCheckbox} 
    color={color}
    size={size}
  />
);

export default FormCheckbox;
