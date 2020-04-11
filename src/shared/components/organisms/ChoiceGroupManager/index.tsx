import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChoiceGroups, postChoiceGroup, patchChoiceGroup, deleteChoiceGroup } from '../../../redux/modules/choiceGroups';
import { RootState } from '../../../redux/store';
import ChoiceGroupManager from './ChoiceGroupManager';
import { AddChoiceDialogState, closeAddChoiceDialog } from '../../../redux/modules/addChoiceDialogState';
import { DialogLoading } from '../../../redux/modules/dialogLoading';
import { FormSubmitHandler } from 'redux-form';
import { ChoiceFormData } from '../../molecules/ChoiceForm';
import { ChoiceGroup } from '../../../../../firebase/functions/src/types';
import { openUpdateChoiceDialog, closeUpdateChoiceDialog, UpdateChoiceDialogState } from '../../../redux/modules/updateChoiceDialogState';
import { openRemoveChoiceDialog, closeRemoveChoiceDialog, RemoveChoiceDialogState } from '../../../redux/modules/removeChoiceDialogState';
import removeDialogState from '../../../redux/modules/removeDialogState';

/**
* フォーム最下に自動追加される空欄が空オブジェクトとして渡ってくる
* 空オブジェクトを削除したChoiceGroupを返す
* @params {ChoiceGroup} フォームから渡されたChoiceGroupオブジェクト
* @return {ChoiceGroup} 空オブジェクトのchoiceOptionを除去したChoiceGroup
*/
function removeEmptyObj(values: ChoiceGroup): ChoiceGroup {
  return ({
      ...values,
      choiceOptions: values.choiceOptions.filter((option) => option.choiceName)
  });
}

/**
 * ChoiceGroup編集に関する画面ロジックをまとめるコンポーネント
 */
const ChoiceGroupManagerContainer = () => {
  const dispatch = useDispatch();
  // selectors
  const choiceGroups =  useSelector<RootState, ChoiceGroups>(state => state.app.choiceGroups);
  const addChoiceDialogState = useSelector<RootState, AddChoiceDialogState>(state => state.dialog.addChoiceDialogState);
  const updateChoiceDialogState =
    useSelector<RootState, UpdateChoiceDialogState>(state => state.dialog.updateChoiceDialogState);
  const removeChoiceDialogState =
    useSelector<RootState, RemoveChoiceDialogState>(state => state.dialog.removeChoiceDialogState);
  const dialogLoading = useSelector<RootState, DialogLoading>(state => state.dialog.dialogLoading);

  //event handlers
  // add
  const onAddChoiceDialogClose = () => {dispatch(closeAddChoiceDialog())};
  const onAddChoiceDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string> = (values, dispatch) => {
    const choiceGroup = removeEmptyObj(values);
    dispatch(postChoiceGroup(choiceGroup));
  };
  // update
  const updateChoiceDialogInitialValues: ChoiceFormData | undefined = choiceGroups.find((group) => group.groupId === updateChoiceDialogState.targetId); 
    const formOptions = updateChoiceDialogInitialValues && updateChoiceDialogInitialValues.choiceOptions;
    if (formOptions && formOptions[formOptions.length - 1].choiceName) {
      formOptions.push({
      choiceName: "",
      choiceEnabled: true,
      choiceId: "",
    });
  }
  const onUpdateChoiceDialogOpen = (groupId: string) => {dispatch(openUpdateChoiceDialog(groupId))}
  const onUpdateChoiceDialogClose = () => {dispatch(closeUpdateChoiceDialog())};
  const onUpdateChoiceDialogSubmit: FormSubmitHandler<ChoiceFormData, {}, string> = (values, dispatch) => {
    const choiceGroup = removeEmptyObj(values);  
    dispatch(patchChoiceGroup(choiceGroup));
  }
  // remove
  const removeTargetChoice = choiceGroups.find((group) => group.groupId === removeChoiceDialogState.targetId);
  const onRemoveChoiceDialogOpen = (groupId: string) => {dispatch(openRemoveChoiceDialog(groupId))}
  const onRemoveChoiceDialogClose = () => {dispatch(closeRemoveChoiceDialog())};
  const onRemoveChoiceGroup = (groupId: string) => {dispatch(deleteChoiceGroup(groupId))};

  return (
    <ChoiceGroupManager
      choiceGroups={choiceGroups}
      addChoiceDialogState={addChoiceDialogState}
      updateChoiceDialogState={updateChoiceDialogState}
      isDialogLoading={dialogLoading}
      onAddChoiceDialogClose={onAddChoiceDialogClose}
      onAddChoiceDialogSubmit={onAddChoiceDialogSubmit}
      onUpdateChoiceDialogOpen={onUpdateChoiceDialogOpen}
      onUpdateChoiceDialogSubmit={onUpdateChoiceDialogSubmit}
      onUpdateChoiceDialogClose={onUpdateChoiceDialogClose}
      updateChoiceDialogInitialValues={updateChoiceDialogInitialValues}
      onRemoveChoiceDialogOpen={onRemoveChoiceDialogOpen}
      onRemoveChoiceDialogClose={onRemoveChoiceDialogClose}
      onRemoveChoiceGroup={onRemoveChoiceGroup}
      removeChoiceDialogState={removeChoiceDialogState}
      removeTargetChoice={removeTargetChoice}
    />
  )
}

export default ChoiceGroupManagerContainer;
