import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GoogleLoginButton from '../../atoms/GoogleLoginButton';

import { Login } from '../../../redux/modules/login';
import { Typography } from '@material-ui/core';

export type LoginFormProps = {
  login: Login; 
}

const FormContainer = styled.div<{loggedIn: boolean}>`
  display: ${props => props.loggedIn ? "none" : "block"}
`;

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {

  return (
    <FormContainer loggedIn={login.loggedIn}>
      <Typography variant="h5" gutterBottom>ログインして開始してください</Typography>
      <GoogleLoginButton />
    </FormContainer>
  );
}

export default LoginForm;
