import React from "react";
import { Field } from "redux-form";
import { TextField } from "@material-ui/core";

const renderTextField = ({
    input,
    label,
    className,
    meta,
}: any) => (
    <TextField
        className={className}
        rowsMax={2}
        label={label}
        variant="outlined"
        {...input}
    />
)

export type Props = {
    name: string,
    label: string,
    className?: string,
}

const FormTextField: React.FC<Props> = ({ className, name, label }) => (
    <Field 
        name={name}
        label={label}
        component={renderTextField}
        className={className}
    />
) 

export default  FormTextField;