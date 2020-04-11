import React from "react";
import { Form, reduxForm, InjectedFormProps } from "redux-form";
import { Longo } from "../../../redux/modules/longos";
import { makeStyles, Theme, Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

import FormTextField from '../../atoms/FormTextField';

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

const LongoForm: React.FC<InjectedFormProps<LongoFormData>> = ({
  handleSubmit
}) => {
    const classes = useStyles();
  return (
    <Form onSubmit={handleSubmit} className={classes.root}>
        <div className={classes.topFieldWrapper}>
            <FormTextField
                name="text"
                label="論語テキスト"
                className={classes.textField}
            />
        </div>
        <div className={classes.fieldWapper}>
            <FormTextField
                name="meaning"
                label="論語の意味"
                className={classes.textField}
            />
        </div>
        <div className={classes.fieldWapper}>
            <FormTextField
                name="comment"
                label="コメント"
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

export default reduxForm<LongoFormData>({
    form: "longo",
})(LongoForm);

