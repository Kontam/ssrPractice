import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChoiceGroups, promiseFetchChoiceGroups, ChoiceGroups } from '../../../redux/modules/choiceGroups';
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
import { Store } from 'redux';

const Choice: React.FC = () => {
  const dispatch = useDispatch();
  const choiceGroups = useSelector<RootState, ChoiceGroups>(state => state.app.choiceGroups)
  const login = useSelector<RootState, Login>(state => state.user.login)
  const isMounted = useSelector<RootState, IsMounted>(state => state.isMounted);
  const authStatus = getAuthStatus(login, Choice.prototype.authorityLevel)
  useEffect(() => { 
    if (isMounted) {
      if (!checkAuthorityLevel(login.authority, Choice.prototype.authorityLevel)) return;
      if (choiceGroups.length > 0) return; 
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

Choice.prototype.getInitialProps = async (store: Store<RootState>): Promise<any> => {
    console.log("Choice getInitialProps");
    const own = store.getState().user.login.authority;
    if (!checkAuthorityLevel(own, Choice.prototype.authorityLevel)) return {};
    const fetchPromise = new Promise((resolve, reject) => {
        store.dispatch(promiseFetchChoiceGroups({resolve, reject}))
    })
    await fetchPromise;
  return {}
}

export default Choice;
