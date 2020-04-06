import React, { FocusEvent, useState } from 'react';
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
        </Form>
    );
}

export default reduxForm<ChoiceFormData>({
    form: "choice"
})(ChoiceForm);