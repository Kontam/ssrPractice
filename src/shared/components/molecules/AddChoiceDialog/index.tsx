import React from 'react';
import ChoiceForm, { ChoiceFormData } from '../ChoiceForm';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import { FormSubmitHandler } from 'redux-form';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: FormSubmitHandler<ChoiceFormData, {}, string>
    isDialogLoading: DialogLoading,
}

const AddChoiceDialog: React.FC<Props> = ({ isOpen, onClose, onSubmit, isDialogLoading }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle>新規グループを追加</DialogTitle>
            <DialogContent>
                <ChoiceForm onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
}

export default AddChoiceDialog;