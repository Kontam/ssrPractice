import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import { Longo } from "../../../redux/modules/longos";
import LoadingLine from "../../atoms/LoadingLine";
import { DialogLoading } from "../../../redux/modules/dialogLoading";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  longo: Longo;
  onDeleteClick: React.MouseEventHandler;
  onCancelClick: React.MouseEventHandler;
  isDialogLoading: DialogLoading;
};

const useStyles = makeStyles({
  heading: {
    marginBottom: 15,
  },
});

const RemoveDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  longo,
  onDeleteClick,
  onCancelClick,
  isDialogLoading,
}) => {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>アイテムの削除</DialogTitle>
      <LoadingLine isLoading={isDialogLoading} />
      <DialogContent dividers>
        <Typography className={classes.heading} variant="h6">
          以下のアイテムを削除します。よろしいですか？
        </Typography>
        <Typography variant="body1">{longo.text}</Typography>
        <Typography variant="body1">{longo.meaning}</Typography>
        <Typography variant="body1">{longo.comment}</Typography>
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
  );
};

export default RemoveDialog;
