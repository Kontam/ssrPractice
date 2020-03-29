import React from 'react';
import Button from '@material-ui/core/Button'
import firebaseApp from '../../../modules/firebaseAuthUtil';
import { startLogin } from '../../../redux/modules/login';
import { useDispatch } from 'react-redux';
import { convertUserObj } from '../../../redux/modules/userInfo';

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch();
  
  const handleLoginClick = () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then((userCredential) => {
      if (!userCredential.user) return;
      userCredential.user.getIdToken().then((idToken :string) => {
        if (!userCredential.user) return;
        dispatch(startLogin(convertUserObj(userCredential.user, idToken)));
        console.log("idToken", idToken)
      })
    });
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleLoginClick} >Login</Button>
    </div>
  );
};

export default GoogleLoginButton;
