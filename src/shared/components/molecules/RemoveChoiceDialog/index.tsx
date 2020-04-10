import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, Typography, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Longo } from '../../../redux/modules/longos';
import LoadingLine from '../../atoms/LoadingLine';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';

type Props = {
    isOpen: boolean 
    onClose: () => void
    choiceGroup?: ChoiceGroup,
    onDeleteClick: (groupId: string) => void 
    onCancelClick: React.MouseEventHandler
    isDialogLoading: DialogLoading
}

const useStyles = makeStyles({
        heading: {
            marginBottom: 15,
        }
    })

const RemoveChoiceDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  choiceGroup,
  onDeleteClick,
  onCancelClick,
  isDialogLoading,
}) => {
    const classes = useStyles();
    const choiceInfo = choiceGroup
      ? (
          <>
            <Typography>{choiceGroup.groupName}</Typography>
            {
                choiceGroup.choiceOptions.map((option) => (
                  <Typography key={option.choiceId}>{option.choiceName}</Typography>
               ))
            }
          </>
      )
      : "";
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle>グループの削除</DialogTitle>
            <LoadingLine isLoading={isDialogLoading} />
            <DialogContent dividers>
              <Typography className={classes.heading} variant="h6">以下のグループを削除します。よろしいですか？</Typography>
              {choiceInfo}
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => { choiceGroup && onDeleteClick(choiceGroup.groupId)} }>
                    削除
                </Button>
                <Button color="inherit" onClick={onCancelClick}>
                    キャンセル
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveChoiceDialog;
