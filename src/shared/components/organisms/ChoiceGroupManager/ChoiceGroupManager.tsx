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
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';

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
}) => {
  return (
    <div>
      <ChoiceDialog 
        isOpen={addChoiceDialogState.isOpen}
        onClose={onAddChoiceDialogClose}
        onSubmit={onAddChoiceDialogSubmit}
        isDialogLoading={isDialogLoading}
        
      />  
      <ChoiceDialog 
        isOpen={updateChoiceDialogState.isOpen}
        onClose={onUpdateChoiceDialogClose}
        onSubmit={onUpdateChoiceDialogSubmit}
        isDialogLoading={isDialogLoading}
        initialValues={updateChoiceDialogInitialValues}
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
