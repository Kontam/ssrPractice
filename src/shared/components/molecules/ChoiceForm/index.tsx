import React from 'react';
import { InjectedFormProps, Form, reduxForm } from 'redux-form';
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';
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
        </Form>
    );
}

export default reduxForm<ChoiceFormData>({
    form: "choice"
})(ChoiceForm);