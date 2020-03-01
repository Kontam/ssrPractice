import React, { FormEventHandler } from 'react';
import { Field, reduxForm, InjectedFormProps, FormProps } from 'redux-form';
import { Longo } from '../../../redux/modules/longos';

export type LongoFormData = Longo;
type Props = {
    onSubmit : any,
}

const LongoForm: React.FC<any> = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>テキスト</label>
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
        </form>
    );
}

export default reduxForm({form: 'longo'})(LongoForm);