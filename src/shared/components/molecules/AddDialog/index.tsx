import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import LongoForm, { LongoFormData } from '../LongoForm';
import { FormSubmitHandler } from 'redux-form';
import { createLongo } from '../../../redux/modules/longos';

type Props = {
    isOpen: boolean,
    onClose: () => void
}

const AddDialog: React.FC<Props> = ({ isOpen, onClose }) => {

    const handleSubmit: FormSubmitHandler<LongoFormData, {} ,string> = (values, dispatch) => {
       dispatch(createLongo(values)); 
    };
    
    return(
        <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle>新規アイテムを追加</DialogTitle>
            <DialogContent>
               <LongoForm onSubmit={handleSubmit} /> 
            </DialogContent>
        </Dialog>
    );
}

export default AddDialog;