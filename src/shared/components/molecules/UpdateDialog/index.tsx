import React from 'react';
import UpdateDialog from "./UpdateDialog";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateDialogState, closeUpdateDialog } from '../../../redux/modules/updateDialogState';
import { RootState } from '../../../redux/store';
import { Longos, updateLongo, Longo } from '../../../redux/modules/longos';
import { FormSubmitHandler } from 'redux-form';
import { DialogLoading } from '../../../redux/modules/dialogLoading';

export type ContainerProps = {
}

export default () => {
    const dispatch = useDispatch();
    const longos = useSelector<RootState, Longos>(state => state.app.longos);
    const updateDialogState = useSelector<RootState, UpdateDialogState>(state => state.dialog.updateDialogState);
    const dialogLoading = useSelector<RootState, DialogLoading>(state => state.dialog.dialogLoading);
    const target = longos.find((longo) => longo.id === updateDialogState.targetId )
    if (!target) return null;

    const onClose = () => dispatch(closeUpdateDialog());
    const onSubmit: FormSubmitHandler<Longo, {}, string> = (values, dispatch) => {
        dispatch(updateLongo({
            ...values,
            id: target.id,
        }))
    };


    return (
        <UpdateDialog
            longo={target}            
            isOpen={updateDialogState.isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isDialogLoading={dialogLoading}
        />
    )
}
