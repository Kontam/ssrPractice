import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import ChoiceForm, { ChoiceFormData } from "../ChoiceForm";
import { DialogLoading } from "../../../redux/modules/dialogLoading";
import { FormSubmitHandler } from "redux-form";
import {
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  DialogActions,
} from "@material-ui/core";
import LoadingLine from "../../atoms/LoadingLine";

const useStyles = makeStyles(
  createStyles({
    contentWrapper: {
      padding: 10,
    },
    dialogHeader: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    }
  })
);

export type ChoiceDialogProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: FormSubmitHandler<ChoiceFormData, {}, string>;
  isDialogLoading: DialogLoading;
  initialValues?: ChoiceFormData;
};

const ChoiceDialog: React.FC<ChoiceDialogProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  isDialogLoading,
  initialValues,
}) => {
  const classes = useStyles();
  const formInitialValues: Omit<ChoiceFormData, "groupId"> = initialValues
    ? initialValues
    : {
        groupName: "",
        choiceOptions: [
          {
            choiceName: "",
            choiceEnabled: true,
            choiceId: "",
          },
        ],
      };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box className={classes.dialogHeader}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogActions>
          <Tooltip title="CSVで登録する" aria-label="Send CSV">
            <IconButton area-label="Send CSV" onClick={() => {}}>
              <PublishIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="CSVをダウンロードする" aria-label="Download CSV">
            <IconButton area-label="Download CSV" onClick={() => {}}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Box>
      <LoadingLine isLoading={isDialogLoading} />
      <DialogContent className={classes.contentWrapper}>
        <ChoiceForm onSubmit={onSubmit} initialValues={formInitialValues} />
      </DialogContent>
    </Dialog>
  );
};

export default ChoiceDialog;
