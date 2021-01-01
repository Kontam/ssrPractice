import React from 'react';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import ChoiceGroupList from '../../molecules/ChoiceGroupList';
import { AddChoiceDialogState } from '../../../redux/modules/addChoiceDialogState';
import { UpdateChoiceDialogState } from '../../../redux/modules/updateChoiceDialogState';
import ChoiceDialog from '../../molecules/ChoiceDialog';
import { FormSubmitHandler } from 'redux-form';
import { ChoiceFormData } from '../../molecules/ChoiceForm';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import RemoveChoiceDialog from '../../molecules/RemoveChoiceDialog';
import { RemoveChoiceDialogState } from '../../../redux/modules/removeChoiceDialogState';
import { ChoiceGroup } from '../../../../../firebase/functions/src/types';

export type ChoiceGroupManagerProps = {
  choiceGroups: ChoiceGroups,
  addChoiceDialogState: AddChoiceDialogState,
  onAddChoiceDialogClose: () => void,
  onAddChoiceDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string>
  onUpdateChoiceDialogOpen: (groupId: string) => void,
  onUpdateChoiceDialogClose: () => void,
  onUpdateChoiceDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string>,
  updateChoiceDialogState: UpdateChoiceDialogState,
  updateChoiceDialogInitialValues?: ChoiceFormData,
  onRemoveChoiceDialogOpen: (groupId: string) => void,
  onRemoveChoiceDialogClose: () => void,
  onRemoveChoiceGroup: (groupId: string) => void,
  removeChoiceDialogState: RemoveChoiceDialogState,
  removeTargetChoice?: ChoiceGroup,
  isDialogLoading: DialogLoading,
  onFileUploadCreator: any,
  handleDownloadCreator: any,
}

const ChoiceGroupManager: React.FC<ChoiceGroupManagerProps> = ({
  choiceGroups,
  addChoiceDialogState,
  updateChoiceDialogState,
  onAddChoiceDialogClose,
  onAddChoiceDialogSubmit,
  onUpdateChoiceDialogOpen, 
  onUpdateChoiceDialogClose,
  onUpdateChoiceDialogSubmit,
  onRemoveChoiceDialogClose,
  onRemoveChoiceDialogOpen,
  onRemoveChoiceGroup,
  isDialogLoading,
  updateChoiceDialogInitialValues,
  removeChoiceDialogState,
  removeTargetChoice,
  onFileUploadCreator,
  handleDownloadCreator,
}) => {
  return (
    <div>
      <ChoiceDialog 
        isOpen={addChoiceDialogState.isOpen}
        title={"新規グループを追加"}
        onClose={onAddChoiceDialogClose}
        onSubmit={onAddChoiceDialogSubmit}
        isDialogLoading={isDialogLoading}
        handleDownloadCreator={handleDownloadCreator}
        onFileUploadCreator={onFileUploadCreator}
      />  
      <ChoiceDialog 
        isOpen={updateChoiceDialogState.isOpen}
        title={"グループを編集"}
        onClose={onUpdateChoiceDialogClose}
        onSubmit={onUpdateChoiceDialogSubmit}
        isDialogLoading={isDialogLoading}
        initialValues={updateChoiceDialogInitialValues}
        handleDownloadCreator={handleDownloadCreator}
        onFileUploadCreator={onFileUploadCreator}
      />  
      <RemoveChoiceDialog
        isOpen={removeChoiceDialogState.isOpen}
        onClose={onRemoveChoiceDialogClose}
        choiceGroup={removeTargetChoice}
        onDeleteClick={onRemoveChoiceGroup}
        isDialogLoading={isDialogLoading}
        onCancelClick={onRemoveChoiceDialogClose}
      />
      <ChoiceGroupList 
        choiceGroups={choiceGroups}
        onUpdateChoiceDialogOpen={onUpdateChoiceDialogOpen}
        onRemoveChoiceDialogOpen={onRemoveChoiceDialogOpen}
      />
    </div>
  )
}

export default ChoiceGroupManager;
