import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

import { Login } from '../../../redux/modules/login';
import { RootState } from '../../../redux/store';

const LoginFormContainer: React.FC = () => {
  const login = useSelector<RootState, Login>(state => state.user.login);

  return (
    <LoginForm 
      login={login}
    />
  );
} 

export default LoginFormContainer;
