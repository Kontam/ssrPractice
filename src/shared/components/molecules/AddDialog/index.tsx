import React from 'react';
import AddDialog from "./AddDialog";
import { useDispatch, useSelector } from 'react-redux';
import { AddDialogState, closeAddDialog } from '../../../redux/modules/addDialogState';
import { RootState } from '../../../redux/store';
import { Longos, addLongo, Longo } from '../../../redux/modules/longos';
import { FormSubmitHandler } from 'redux-form';
import { LongoFormData } from '../LongoForm';
import { createLongo } from '../../../redux/modules/longos';
import { DialogLoading } from '../../../redux/modules/dialogLoading';

export type ContainerProps = {
}

export default () => {
    const dispatch = useDispatch();
    const addDialogState = useSelector<RootState, AddDialogState>(state => state.dialog.addDialogState);
    const dialogLoading = useSelector<RootState, DialogLoading>(state => state.dialog.dialogLoading);

    const onClose = () => dispatch(closeAddDialog());
    const onSubmit: FormSubmitHandler<LongoFormData, {} ,string> = (values, dispatch) => {
       dispatch(createLongo(values)); 
    };


    return (
        <AddDialog
            isOpen={addDialogState.isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isDialogLoading={dialogLoading}
        />
    )
}
