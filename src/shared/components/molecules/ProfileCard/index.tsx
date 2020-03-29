import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from './ProfileCard';
import firebaseApp from '../../../modules/firebaseAuthUtil';

import { RootState } from '../../../redux/store';
import { UserInfo } from '../../../redux/modules/userInfo';
import { Login, startLogout } from '../../../redux/modules/login';

export const ProfileCardContainer = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector<RootState, UserInfo>(state => state.userInfo);
  const login = useSelector<RootState, Login>(state => state.login);

  const tableData = [
    {
      name: "Authority",
      data: login.authority,      
    },
    {
      name: "Email",
      data: userInfo.email,      
    },
  ];

  const handleLogout = () => {
   // firebaseApp.auth().signOut();
    dispatch(startLogout());
    console.log("handleLogoutClick");
  }

  return (
    <ProfileCard 
      userInfo={userInfo}
      tableData={tableData}
      login={login}
      handleLogout={handleLogout}
    />
  )
}

export default ProfileCardContainer;
