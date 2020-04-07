import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';
import { InjectedFormProps, Form, reduxForm, FieldArray, Field, Fields, WrappedFieldArrayProps, EventWithDataHandler } from 'redux-form';
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';
import FieldArrayText from '../../atoms/FieldArrayText';
import FormTextField from '../../atoms/FormTextField';

export type ChoiceFormData = ChoiceGroup;

const ChoiceForm: React.FC<InjectedFormProps<ChoiceFormData>> = ({
    handleSubmit,
}) => {
    return (
        <Form
            onSubmit={handleSubmit}
        >
            <div>
                <FormTextField
                    name="groupName"
                    label="グループ名"
                />
            </div>
            <FieldArray name="choiceOptions" component={FieldArrayText} />
            <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                type="submit"
            >
                Send
            </Button>
        </Form>
    );
}

export default reduxForm<ChoiceFormData>({
    form: "choice"
})(ChoiceForm);