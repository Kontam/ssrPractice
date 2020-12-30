import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
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
    uploader: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
  })
);

export type ChoiceDialogProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: FormSubmitHandler<ChoiceFormData, {}, string>;
  isDialogLoading: DialogLoading;
  initialValues?: ChoiceFormData;
  onFileUploadCreator: any;
  handleDownloadCreator: any;
};

const ChoiceDialog: React.FC<ChoiceDialogProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  isDialogLoading,
  initialValues,
  onFileUploadCreator,
  handleDownloadCreator,
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
  const CSVDownloadURL = handleDownloadCreator('content,content');
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box className={classes.dialogHeader}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogActions>
            <>
              <input
                id="choiceDialog--uploadFile"
                className={classes.uploader}
                type="file"
                onChange={onFileUploadCreator(initialValues?.groupId)}
                accept=".csv"
              />
              <label htmlFor="choiceDialog--uploadFile">
                <Tooltip title="CSVで登録する" aria-label="Send CSV">
                  <IconButton area-label="Send CSV" component="span">
                    <PublishIcon />
                  </IconButton>
                </Tooltip>
              </label>
            </>
          <Tooltip title="CSVをダウンロードする" aria-label="Download CSV">
            <a download="test.txt" href={CSVDownloadURL} onClick={handleDownloadCreator}>
              <IconButton area-label="Download CSV">
                <GetAppIcon />
              </IconButton>
            </a>
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
