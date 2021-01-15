import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LoadingLine from "../../atoms/LoadingLine";
import { DialogLoading } from "../../../redux/modules/dialogLoading";
import { ChoiceGroup } from "../../../../../firebase/functions/src/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  choiceGroup?: ChoiceGroup;
  onDeleteClick: (groupId: string) => void;
  onCancelClick: React.MouseEventHandler;
  isDialogLoading: DialogLoading;
};

const useStyles = makeStyles({
  heading: {
    marginBottom: 15,
  },
});

const RemoveChoiceDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  choiceGroup,
  onDeleteClick,
  onCancelClick,
  isDialogLoading,
}) => {
  const classes = useStyles();
  const choiceInfo = choiceGroup ? (
    <>
      <Typography>{choiceGroup.groupName}</Typography>
      {choiceGroup.choiceOptions.map((option) => (
        <Typography key={option.choiceId}>{option.choiceName}</Typography>
      ))}
    </>
  ) : (
    ""
  );
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>グループの削除</DialogTitle>
      <LoadingLine isLoading={isDialogLoading} />
      <DialogContent dividers>
        <Typography className={classes.heading} variant="h6">
          以下のグループを削除します。よろしいですか？
        </Typography>
        {choiceInfo}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            choiceGroup && onDeleteClick(choiceGroup.groupId);
          }}
        >
          削除
        </Button>
        <Button color="inherit" onClick={onCancelClick}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveChoiceDialog;
