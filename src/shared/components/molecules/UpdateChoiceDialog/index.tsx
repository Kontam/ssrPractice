import React from "react";
import ChoiceForm, { ChoiceFormData } from "../ChoiceForm";
import { DialogLoading } from "../../../redux/modules/dialogLoading";
import { FormSubmitHandler } from "redux-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingLine from "../../atoms/LoadingLine";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: FormSubmitHandler<ChoiceFormData, {}, string>;
  isDialogLoading: DialogLoading;
};

const UpdateChoiceDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  isDialogLoading,
}) => {
  const formInitialValues = {
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
    <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>グループを更新</DialogTitle>
      <LoadingLine isLoading={isDialogLoading} />
      <DialogContent>
        <ChoiceForm onSubmit={onSubmit} initialValues={formInitialValues} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateChoiceDialog;
