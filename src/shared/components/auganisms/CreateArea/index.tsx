import React, { Dispatch } from 'react'
import { useSelector } from 'react-redux';
import LongoForm, { LongoFormData } from '../../molecules/LongoForm'
import { FormSubmitHandler, SubmitHandler, InjectedFormProps } from 'redux-form'
import { setLongos } from '../../../redux/modules/longos'

const formSelector = (state: any) => state.form;
const CreateArea: React.FC = () => {
    const formValues = useSelector(formSelector);
    const handleSubmit: FormSubmitHandler = (values:any, dispatch: Dispatch<typeof setLongos>) => {
        values.persist();
        values.preventDefault();
        console.log(values)
        console.log("formValues", formValues.longo.values);
    };

    return (
        <div>
            <h2>新しく作る</h2>
            <LongoForm onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateArea;