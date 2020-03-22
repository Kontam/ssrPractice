import React, { useState, useEffect } from 'react';
import { User } from 'firebase';
import firebaseApp from '../../../modules/firebaseAuthUtil';
import GoogleLoginButton from '../../atoms/GoogleLoginButton';

const LoginForm = () => {
  
  const [user, setUser] = useState<Partial<User>>();
  
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        user.getIdToken().then((idToken: any) => {
        });
        setUser(user);
        console.log(user);
      }
      else setUser({});
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
