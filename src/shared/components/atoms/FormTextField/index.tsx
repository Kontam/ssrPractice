import React, { FocusEvent, ChangeEvent } from "react";
import { Field, EventWithDataHandler } from "redux-form";
import { TextField } from "@material-ui/core";

const renderTextField = ({
    input,
    label,
    className,
    meta,
    variant,
}: any) => (
    <TextField
        className={className}
        rowsMax={2}
        label={label}
        variant={variant}
        {...input}
    />
)

export type Props = {
    name: string,
    label: string,
    className?: string,
    onChange?: EventWithDataHandler<ChangeEvent<any>>,
    onFocus?: EventWithDataHandler<FocusEvent<any>>
    variant?: string,
}

const FormTextField: React.FC<Props> = ({ className, name, label, onChange, onFocus, variant }) => (
    <Field 
        name={name}
        label={label}
        component={renderTextField}
        className={className}
        onChange={onChange}
        onFocus={onFocus}
        variant={variant}
    />
) 

export default  FormTextField;
