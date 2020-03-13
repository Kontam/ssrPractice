import React from 'react';
import RemoveDialog from "./RemoveDialog";
import { useDispatch, useSelector } from 'react-redux';
import { RemoveDialogState, closeRemoveDialog } from '../../../redux/modules/removeDialogState';
import { RootState } from '../../../redux/store';
import { Longos, removeLongo, Longo, deleteLongo } from '../../../redux/modules/longos';
import { FormSubmitHandler } from 'redux-form';

export type ContainerProps = {
}

export default () => {
    const dispatch = useDispatch();
    const longos = useSelector<RootState, Longos>(state => state.longos);
    const removeDialogState = useSelector<RootState, RemoveDialogState>(state => state.removeDialogState);
    const target = longos.find((longo) => longo.id === removeDialogState.targetId )
    if (!target) return null;

    const onClose = () => dispatch(closeRemoveDialog());
    const onDeleteClick: React.MouseEventHandler = () => {
        dispatch(deleteLongo(target.id))
    };
    const onCancelClick: React.MouseEventHandler = () => {
        dispatch(closeRemoveDialog());
    }


    return (
        <RemoveDialog
            longo={target}            
            isOpen={removeDialogState.isOpen}
            onClose={onClose}
            onDeleteClick={onDeleteClick}
            onCancelClick={onCancelClick}
        />
    )
}