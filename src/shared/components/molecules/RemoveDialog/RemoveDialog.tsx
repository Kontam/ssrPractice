import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';
import { Longo } from '../../../redux/modules/longos';

type Props = {
    isOpen: boolean 
    onClose: () => void
    longo: Longo
    onDeleteClick: React.MouseEventHandler
    onCancelClick: React.MouseEventHandler
}

const RemoveDialog: React.FC<Props> = ({isOpen, onClose, longo, onDeleteClick, onCancelClick}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle>アイテムの削除</DialogTitle>
            <DialogContent>
                <Typography>以下のアイテムを削除します。よろしいですか？</Typography>
                <Typography>{longo.text}</Typography>
                <Typography>{longo.meaning}</Typography>
                <Typography>{longo.comment}</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onDeleteClick}>
                    削除
                </Button>
                <Button color="inherit" onClick={onCancelClick}>
                    キャンセル
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveDialog;