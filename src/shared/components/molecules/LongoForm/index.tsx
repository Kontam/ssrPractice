import React, { FormEventHandler } from 'react';
import { Form, Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Longo } from '../../../redux/modules/longos';

export type LongoFormData = Longo;

const LongoForm: React.FC<InjectedFormProps<LongoFormData>> = ({ handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label>テキスト2</label>
                <Field type="text" component="input" name="text" />
            </div>
            <div>
                <label>意味</label>
                <Field type="text" component="input" name="meaning" />
            </div>
            <div>
                <label>コメント</label>
                <Field type="text" component="input" name="comment" />
            </div>
            <button type="submit">送信</button>
        </Form>
    );
}

export default reduxForm<LongoFormData>({form: 'longo'})(LongoForm);