import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';






const Login = () => {

    const history = useHistory();
    const location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};
   
    const [loggedInUser,setLoggedInUser] =useContext(UserContext);
    const [user,setUser] = useState({
        isSignedIn : false,
        buyer : '',
        email : '',
        photo : '',
        error : '',
        success : false
        
    })

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var user = result.user;
    console.log(user)
    const {displayName,email,photoURL} =user;
    const signedInUser = {
        isSignedIn : true,
        buyer : displayName,
        email : email,
        photo : photoURL,
        success: true
    }
    setUser(signedInUser);
    setLoggedInUser(signedInUser);
    history.replace(from);

    
  }).catch((error) => {
   
    var errorMessage = error.message;
     console.log(errorMessage)
  });
    }


    return (
        <div className="login-container">
          { user.isSignedIn?  <h1>{loggedInUser.buyer} logged in successfully.</h1>
           : <button className="login-btn" onClick={handleGoogleSignIn}>Continue With Google</button>}
        </div>
    );
};

export default Login;