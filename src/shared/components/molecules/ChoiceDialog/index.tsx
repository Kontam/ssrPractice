import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import ChoiceForm, { ChoiceFormData } from "../ChoiceForm";
import { DialogLoading } from "../../../redux/modules/dialogLoading";
import { FormSubmitHandler } from "redux-form";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import LoadingLine from "../../atoms/LoadingLine";

const useStyles = makeStyles(
  createStyles({
    contentWrapper: {
      padding: 10,
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
      <DialogTitle>{title}</DialogTitle>
      <LoadingLine isLoading={isDialogLoading} />
      <DialogContent className={classes.contentWrapper}>
        <ChoiceForm onSubmit={onSubmit} initialValues={formInitialValues} />
      </DialogContent>
    </Dialog>
  );
};

export default ChoiceDialog;
