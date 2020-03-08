import React from "react";
import { Form, Field, reduxForm, InjectedFormProps } from "redux-form";
import { Longo } from "../../../redux/modules/longos";
import { TextField, makeStyles, Theme, Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

export type LongoFormData = Longo;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: 500,
        padding: "2%",
    },
    topFieldWrapper: {
    },
    fieldWapper: {
        marginTop: 20,
    },
    textField: {
        width: "100%",
    },
    submitButton: {
        marginTop: 20,
    }
}))

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

const LongoForm: React.FC<InjectedFormProps<LongoFormData>> = ({
  handleSubmit
}) => {
    const classes = useStyles();
  return (
    <Form onSubmit={handleSubmit} className={classes.root}>
        <div className={classes.topFieldWrapper}>
            <Field 
                name="text"
                label="論語テキスト"
                component={renderTextField}
                className={classes.textField}
            />
        </div>
        <div className={classes.fieldWapper}>
            <Field
                name="meaning"
                label="論語の意味"
                component={renderTextField}
                className={classes.textField}
            />
        </div>
        <div className={classes.fieldWapper}>
            <Field
                name="comment"
                label="コメント"
                component={renderTextField}
                className={classes.textField}
            />
        </div>
        <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            type="submit"
        >
            Send
        </Button>
    </Form>
  );
};

export default reduxForm<LongoFormData>({ form: "longo" })(LongoForm);
