import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GoogleLoginButton from '../../atoms/GoogleLoginButton';

import { UserInfo } from '../../../redux/modules/userInfo';
import { Login } from '../../../redux/modules/login';

export type LoginFormProps = {
  login: Login; 
}

const FormContainer = styled.div<{loggedIn: boolean}>`
  display: ${props => props.loggedIn ? "none" : "block"}
`;

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {

  return (
    <FormContainer loggedIn={login.loggedIn}>
      <GoogleLoginButton />
    </FormContainer>
  );
}

export default LoginForm;
