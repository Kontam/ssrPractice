import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChoiceGroups } from '../../../redux/modules/choiceGroups';
import Const from '../../../modules/const';
import ChoiceComponent from './Choice';
import { AppFAB } from '../../molecules/AppButtonContainer';
import AddIcon from '@material-ui/icons/Add';
import { openAddChoiceDialog } from '../../../redux/modules/addChoiceDialogState';

const Choice: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChoiceGroups()); 
  },[]);

  const appButtons: AppFAB[] = [
      {
          name: 'チョイス追加',
          color: 'default',
          onClick: (e) => { dispatch(openAddChoiceDialog())},
          IconComponent: <AddIcon />,
          description: "新しいグループを作成",
      }
  ]

  return (
    <ChoiceComponent appButtons={appButtons}/>
  );
}

Choice.prototype.authorityLevel = Const;

export default Choice;
