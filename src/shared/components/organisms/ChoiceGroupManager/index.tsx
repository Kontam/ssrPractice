import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import { RootState } from '../../../redux/store';
import ChoiceGroupManager from './ChoiceGroupManager';
import { AddChoiceDialogState, closeAddChoiceDialog } from '../../../redux/modules/addChoiceDialogState';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import { FormSubmitHandler } from 'redux-form';
import { ChoiceFormData } from '../../molecules/ChoiceForm';

const ChoiceGroupManagerContainer = () => {
  const dispatch = useDispatch();
  const onAddDialogClose = () => {dispatch(closeAddChoiceDialog())}
  const onAddDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string> = (values, dispatch) => {
    console.log("onAddDialogSubmit");
  };
  const choiceGroups =  useSelector<RootState, ChoiceGroups>(state => state.app.choiceGroups);
  const addChoiceDialogState = useSelector<RootState, AddChoiceDialogState>(state => state.dialog.addChoiceDialogState);
  const dialogLoading = useSelector<RootState, DialogLoading>(state => state.dialog.dialogLoading);
  return (
    <ChoiceGroupManager
      choiceGroups={choiceGroups}
      addChoiceDialogState={addChoiceDialogState}
      isDialogLoading={dialogLoading}
      onAddDialogClose={onAddDialogClose}
      onAddDialogSubmit={onAddDialogSubmit}
    />
  )
}

export default ChoiceGroupManagerContainer;
