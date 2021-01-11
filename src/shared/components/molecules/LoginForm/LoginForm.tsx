import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import GoogleLoginButton from "../../atoms/GoogleLoginButton";

import { Login } from "../../../redux/modules/login";

export type LoginFormProps = {
  login: Login;
};

const FormContainer = styled.div<{ loggedIn: boolean }>`
  display: ${(props) => (props.loggedIn ? "none" : "block")};
`;

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  return (
    <FormContainer loggedIn={login.loggedIn}>
      <Typography variant="h5" gutterBottom>
        ログインして開始してください
      </Typography>
      <GoogleLoginButton />
    </FormContainer>
  );
};

export default LoginForm;
