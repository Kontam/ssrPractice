import React from 'react'
import LongoForm, { LongoFormData } from '../../molecules/LongoForm'
import { FormSubmitHandler } from 'redux-form'
import { createLongo } from '../../../redux/modules/longos'

const CreateArea: React.FC = () => {
    const handleSubmit: FormSubmitHandler<LongoFormData, {} ,string> = (values, dispatch) => {
       dispatch(createLongo(values)); 
    };

    return (
        <div>
            <h2>新しく作る</h2>
            <LongoForm onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateArea;