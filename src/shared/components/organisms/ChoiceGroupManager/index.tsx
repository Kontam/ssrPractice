import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChoiceGroups, postChoiceGroup } from '../../../redux/modules/choiceGroups';
import { RootState } from '../../../redux/store';
import ChoiceGroupManager from './ChoiceGroupManager';
import { AddChoiceDialogState, closeAddChoiceDialog } from '../../../redux/modules/addChoiceDialogState';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import { FormSubmitHandler } from 'redux-form';
import { ChoiceFormData } from '../../molecules/ChoiceForm';
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';

const ChoiceGroupManagerContainer = () => {
  const dispatch = useDispatch();
  const onAddDialogClose = () => {dispatch(closeAddChoiceDialog())}
  const onAddDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string> = (values, dispatch) => {
    // 必ず最下に空欄のoptionがあるので除去する
    const choiceGroup: ChoiceGroup = {
      ...values,
      choiceOptions: values.choiceOptions.filter((option) => option.choiceName)
    }
    console.log("onSubmit", choiceGroup)
    dispatch(postChoiceGroup(choiceGroup));
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
