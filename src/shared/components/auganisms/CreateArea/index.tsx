import React, { Dispatch } from 'react'
import { useSelector } from 'react-redux';
import LongoForm, { LongoFormData } from '../../molecules/LongoForm'
import { FormSubmitHandler, SubmitHandler, InjectedFormProps } from 'redux-form'
import { setLongos } from '../../../redux/modules/longos'

const CreateArea: React.FC = () => {
    const handleSubmit: FormSubmitHandler<LongoFormData, {} ,string> = (values, dispatch) => {
        console.log(values, dispatch)
    };

    console.log("CreateArea", LongoForm)
    return (
        <div>
            <h2>新しく作る</h2>
            <LongoForm onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateArea;