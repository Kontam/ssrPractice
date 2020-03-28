import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import firebaseApp from '../../../modules/firebaseAuthUtil';
import { User } from 'firebase';
import LoginForm from './LoginForm';
import { setUserInfo, removeUserInfo, UserInfo, convertUserObj } from '../../../redux/modules/userInfo';
import { startLogin } from '../../../redux/modules/login';
import { RootState } from '../../../redux/store';

const LoginFormContainer: React.FC = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector<RootState, UserInfo>(state => state.userInfo);
  
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if(user) {
        if (!userInfo.uid) {
          const idToken = await user.getIdToken();
          dispatch(startLogin(convertUserObj(user, idToken)));
        }
      }
      else dispatch(removeUserInfo());
    })
  },[])

  return (
    <LoginForm 
      userInfo={userInfo}
    />
  );
} 

export default LoginFormContainer;
