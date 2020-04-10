import React from 'react';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import ChoiceGroupList from '../../molecules/ChoiceGroupList';
import { AddChoiceDialogState } from '../../../redux/modules/addChoiceDialogState';
import { UpdateChoiceDialogState } from '../../../redux/modules/updateChoiceDialogState';
import ChoiceDialog from '../../molecules/ChoiceDialog';
import { FormSubmitHandler } from 'redux-form';
import { ChoiceFormData } from '../../molecules/ChoiceForm';
import { DialogLoading } from '../../../redux/modules/dialogLoading';

export type ChoiceGroupManagerProps = {
  choiceGroups: ChoiceGroups,
  addChoiceDialogState: AddChoiceDialogState,
  onAddChoiceDialogClose: () => void,
  onAddChoiceDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string>
  onUpdateChoiceDialogOpen: (groupId: string) => void,
  updateChoiceDialogState: UpdateChoiceDialogState,
  onUpdateChoiceDialogClose: () => void,
  onUpdateChoiceDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string>,
  isDialogLoading: DialogLoading,
  updateChoiceDialogInitialValues?: ChoiceFormData,
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
  isDialogLoading,
  updateChoiceDialogInitialValues,
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
      <ChoiceGroupList 
        choiceGroups={choiceGroups}
        onUpdateChoiceDialogOpen={onUpdateChoiceDialogOpen}
      />
    </div>
  )
}

export default ChoiceGroupManager;
