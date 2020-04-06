import React, { FocusEvent, ChangeEvent } from "react";
import { Field, EventWithDataHandler } from "redux-form";
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
    onChange?: EventWithDataHandler<ChangeEvent<any>>,
    onFocus?: EventWithDataHandler<FocusEvent<any>>
}

const FormTextField: React.FC<Props> = ({ className, name, label, onChange, onFocus }) => (
    <Field 
        name={name}
        label={label}
        component={renderTextField}
        className={className}
        onChange={onChange}
        onFocus={onFocus}
    />
) 

export default  FormTextField;