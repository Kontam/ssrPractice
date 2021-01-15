import React from "react";
import Typography from "@material-ui/core/Typography";
import GoogleLoginButton from "../../atoms/GoogleLoginButton";

import { Login } from "../../../redux/modules/login";
import { makeStyles } from "@material-ui/core/styles";

export type LoginFormProps = {
  login: Login;
};

const useStyles = makeStyles<any,{loggedIn: boolean}>({
  root: {
    display: (props) => (props.loggedIn ? "none" : "block")   
  }
});

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  const styles = useStyles({ loggedIn: login.loggedIn});
  return (
    <div className={styles.root}>
      <Typography variant="h5" gutterBottom>
        ログインして開始してください
      </Typography>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginForm;
