import React, { useEffect, useState } from 'react';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDyn3UYXuaB-kfl2wS4amrug5EZVde-t2U",
    authDomain: "longo-ed4e7.firebaseapp.com",
    databaseURL: "https://longo-ed4e7.firebaseio.com",
    projectId: "longo-ed4e7",
    storageBucket: "longo-ed4e7.appspot.com",
    messagingSenderId: "805207857372",
    appId: "1:805207857372:web:dbae48e3b69e7122a1bc19"
};

firebase.initializeApp(config);

type Props = {
  onSignIn: (googleUser: any) => void
};

const GoogleLoginButton: React.FC = () => {
  
  const [user, setUser] = useState<Partial<User>>();

  useEffect(() => {
    console.log("useEffect");
    firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", user);
      if(user) {
        user.getIdToken().then((idToken: any) => {
          console.log("onAuth", idToken);
        });
        setUser(user);
      }
      else setUser({});
    })
  },[])
  
  const handleLoginClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user) => {
      user.user?.getIdToken().then((idToken => {
        console.log("idToken", idToken)
      }
    });
  }

  const handleLogoutClick = () => {
    console.log("handleLogoutClick");
    firebase.auth().signOut();
  }

  return (
    <div>
      <button onClick={handleLoginClick} >Login</button>
      {user && user.email || "no"}
      <button onClick={handleLogoutClick} >Logout</button>
    </div>
  );
};

export default GoogleLoginButton;
