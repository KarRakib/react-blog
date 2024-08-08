import React, { createContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged, updateProfile, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import {auth} from '../Firebase/firebase.config'
export const UserContext = createContext()
const AuthContext = ({children}) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const provider = new GoogleAuthProvider();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
const signUpEmailPass = (email,password)=>{
  return createUserWithEmailAndPassword(auth,email,password)
}
const signInEmailPass = (email,password)=>{
  return signInWithEmailAndPassword(auth,email,password)
}


const userUpdate = (name, photo) =>{
  console.log(name,photo);
  return updateProfile(auth.currentUser,{
    displayName:name,photoURL:photo
  })

}

const emailVerified = ()=>{
  return sendEmailVerification(auth.currentUser)
}
 const resetPassword = (email) =>{
  return sendPasswordResetEmail(auth,email)
 }
   const authValue ={user,loading,googleSignIn,signUpEmailPass,signInEmailPass,resetPassword,userUpdate,emailVerified}
  return (
    <UserContext.Provider value={authValue}>
        {children}
    </UserContext.Provider>
  )
}

export default AuthContext