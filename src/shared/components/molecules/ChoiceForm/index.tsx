import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';
import { InjectedFormProps, Form, reduxForm, FieldArray, Field, Fields, WrappedFieldArrayProps, EventWithDataHandler } from 'redux-form';
import { ChoiceGroup } from '../../../../../firebase/functions/src/types';
import FieldArrayText from '../../atoms/FieldArrayText';
import FormTextField from '../../atoms/FormTextField';

const useStyles = makeStyles(
  createStyles({
    root: {
      width: '100%',
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10,
    },
    groupNameInput: {
      width: 500,
    },
    childList: {
      marginTop:30,
      marginBottom: 30,
      maxHeight: '50vh',
      overflowY: 'scroll',
    },
    formFooter: {
      width: '100%',
      textAlign: 'right',
    }
  })
);

export type ChoiceFormData = ChoiceGroup;

const ChoiceForm: React.FC<InjectedFormProps<ChoiceFormData>> = ({
    handleSubmit,
}) => {
    const classes = useStyles();
    return (
        <Form
            onSubmit={handleSubmit}
            className={classes.root}
        >
            <div>
                <FormTextField
                    name="groupName"
                    label="グループ名"
                    className={classes.groupNameInput}
                    variant="outlined"
                />
            </div>
            <div className={classes.childList}>
              <FieldArray name="choiceOptions" component={FieldArrayText} />
            </div>
            <div className={classes.formFooter}>
              <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  type="submit"
              >
                  Send
              </Button>
            </div>
        </Form>
    );
}

export default reduxForm<ChoiceFormData>({
    form: "choice"
})(ChoiceForm);
