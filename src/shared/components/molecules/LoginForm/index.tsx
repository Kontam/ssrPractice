import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'firebase';
import firebaseApp from '../../../modules/firebaseAuthUtil';
import GoogleLoginButton from '../../atoms/GoogleLoginButton';

import { setUserInfo, removeUserInfo, UserInfo } from '../../../redux/modules/userInfo';
import { RootState } from '../../../redux/store';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserInfo>(state => state.userInfo);
  
  
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        user.getIdToken().then((idToken: any) => {
        });
        dispatch(setUserInfo(user));

        console.log(user);
      }
      else dispatch(removeUserInfo());
    })
  },[])

  return (
    <div>
      <p>Name: {user && user.displayName}</p>
      <p>email: {user && user.email}</p>
      <GoogleLoginButton />
    </div>
  );
}

export default LoginForm;
