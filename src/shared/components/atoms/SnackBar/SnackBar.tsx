import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, SnackbarProps } from '@material-ui/core';

type Props = {
    isOpen: boolean,
    message: string,
    handleClose: SnackbarProps["onClose"],
}

const SnackBar: React.FC<Props> = ({ isOpen, message, handleClose }) => {
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" severity="success">{message}</MuiAlert>
        </Snackbar>
    );
}

export default SnackBar;