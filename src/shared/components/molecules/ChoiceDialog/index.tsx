import React from 'react';
import ChoiceForm, { ChoiceFormData } from '../ChoiceForm';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import { FormSubmitHandler } from 'redux-form';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import LoadingLine from '../../atoms/LoadingLine';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: FormSubmitHandler<ChoiceFormData, {}, string>
    isDialogLoading: DialogLoading,
    initialValues?: ChoiceFormData,
}

const AddChoiceDialog: React.FC<Props> = ({ 
  isOpen,
  onClose,
  onSubmit,
  isDialogLoading,
  initialValues,
}) => {
    const formInitialValues = initialValues
      ? initialValues
      : {
            groupName:"",
            choiceOptions: [{
                choiceName: "",
                choiceEnabled: true,
                choiceId: "",
            }],
        }
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle>新規グループを追加</DialogTitle>
            <LoadingLine isLoading={isDialogLoading} />
            <DialogContent>
                <ChoiceForm onSubmit={onSubmit} initialValues={formInitialValues} />
            </DialogContent>
        </Dialog>
    );
}

export default AddChoiceDialog;
