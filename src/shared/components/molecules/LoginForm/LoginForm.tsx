import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLoginButton from '../../atoms/GoogleLoginButton';

import { UserInfo } from '../../../redux/modules/userInfo';

export type LoginFormProps = {
  userInfo: UserInfo; 
}

const LoginForm: React.FC<LoginFormProps> = ({ userInfo }) => {

  return (
    <div>
      <p>Name: {userInfo && userInfo.displayName}</p>
      <p>email: {userInfo && userInfo.email}</p>
      <GoogleLoginButton />
    </div>
  );
}

export default LoginForm;
