import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import firebaseApp from '../../../modules/firebaseAuthUtil';
import { User } from 'firebase';
import LoginForm from './LoginForm';
import { setUserInfo, removeUserInfo, UserInfo, convertUserObj } from '../../../redux/modules/userInfo';
import { startLogin, Login } from '../../../redux/modules/login';
import { RootState } from '../../../redux/store';

const LoginFormContainer: React.FC = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector<RootState, UserInfo>(state => state.userInfo);
  const login = useSelector<RootState, Login>(state => state.login);
  
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      console.log("authStateChanged");
      if(user) {
        if (!userInfo.uid) {
          const idToken = await user.getIdToken();
          dispatch(startLogin(convertUserObj(user, idToken)));
        }
      }
      else console.error("LoginForm user is null");
    })
  },[])

  return (
    <LoginForm 
      login={login}
    />
  );
} 

export default LoginFormContainer;
