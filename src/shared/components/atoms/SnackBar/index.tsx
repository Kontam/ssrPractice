import React from 'react';
import SnackBar from './SnackBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SnackBarState, closeSnackBar } from '../../../redux/modules/snackBarState';
import { SnackbarProps } from '@material-ui/core';

export default () => {
    const dispatch = useDispatch();
    const { isOpen, message } = useSelector<RootState, SnackBarState>(state => state.snackBarState)
    const onClose :SnackbarProps["onClose"] = (event, reason) => {dispatch(closeSnackBar())}

    return (
        <SnackBar isOpen={isOpen} message={message} handleClose={onClose} />
    )    
}

