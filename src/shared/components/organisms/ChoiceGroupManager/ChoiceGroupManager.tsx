import React from 'react';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import ChoiceGroupList from '../../molecules/ChoiceGroupList';
import { AddChoiceDialogState } from '../../../redux/modules/addChoiceDialogState';
import AddChoiceDialog from '../../molecules/AddChoiceDialog';
import { FormSubmitHandler } from 'redux-form';
import { ChoiceFormData } from '../../molecules/ChoiceForm';
import { DialogLoading } from '../../../redux/modules/dialogLoading';

export type ChoiceGroupManagerProps = {
  choiceGroups: ChoiceGroups,
  addChoiceDialogState: AddChoiceDialogState,
  onAddDialogClose: () => void,
  onAddDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string>
  isDialogLoading: DialogLoading,
}

const ChoiceGroupManager: React.FC<ChoiceGroupManagerProps> = ({
  choiceGroups,
  addChoiceDialogState,
  onAddDialogClose,
  onAddDialogSubmit,
  isDialogLoading,
}) => {
  return (
    <div>
      <AddChoiceDialog 
        isOpen={addChoiceDialogState.isOpen}
        onClose={onAddDialogClose}
        onSubmit={onAddDialogSubmit}
        isDialogLoading={isDialogLoading}
      />  
      <ChoiceGroupList choiceGroups={choiceGroups} />
    </div>
  )
}

export default ChoiceGroupManager;
