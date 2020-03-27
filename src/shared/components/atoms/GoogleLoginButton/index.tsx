import React, { useEffect, useState } from 'react';
import firebase, { User } from 'firebase/app';
import firebaseApp from '../../../modules/firebaseAuthUtil';

type Props = {
  onSignIn: (googleUser: any) => void
};

const GoogleLoginButton: React.FC = () => {
  
  
  const handleLoginClick = () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then((user) => {
      user.user?.getIdToken().then((idToken :string) => {
        console.log("idToken", idToken)
      })
    });
  }

  const handleLogoutClick = () => {
    console.log("handleLogoutClick");
    firebaseApp.auth().signOut();
  }

  return (
    <div>
      <button onClick={handleLoginClick} >Login</button>
      <button onClick={handleLogoutClick} >Logout</button>
    </div>
  );
};

export default GoogleLoginButton;
