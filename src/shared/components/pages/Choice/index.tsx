import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChoiceGroups } from '../../../redux/modules/choiceGroups';
import Const from '../../../modules/const';
import ChoiceComponent from './Choice';
import { AppFAB } from '../../molecules/AppButtonContainer';
import AddIcon from '@material-ui/icons/Add';
import { openAddChoiceDialog } from '../../../redux/modules/addChoiceDialogState';
import { RootState } from '../../../redux/store';
import { Login } from '../../../redux/modules/login';
import getAuthStatus from '../../../modules/getAuthStatus';
import { IsMounted } from '../../../redux/modules/isMounted';
import { checkAuthorityLevel } from '../../../routes/checkAuthorityLevel';

const Choice: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector<RootState, Login>(state => state.user.login)
  const isMounted = useSelector<RootState, IsMounted>(state => state.isMounted);
  const authStatus = getAuthStatus(login, Choice.prototype.authorityLevel)
  useEffect(() => { dispatch(fetchChoiceGroups()); },[]);
  useEffect(() => { 
    if (isMounted) {
      if (!checkAuthorityLevel(login.authority, Choice.prototype.authorityLevel)) return;
      dispatch(fetchChoiceGroups());
    }
  }, [])

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
    <ChoiceComponent
      appButtons={appButtons}
      authStatus={authStatus}
    />
  );
}

Choice.prototype.authorityLevel = Const.AUTHORITY_MEMBER;

export default Choice;
