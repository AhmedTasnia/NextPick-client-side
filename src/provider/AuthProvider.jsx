import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import app from '../Firebase/firebase.config';
export const AuthContext = createContext();
export const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   const updateUser = (updatedData) => {
//     return updateProfile(auth.currentUser, updatedData);
//   };

//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logOut = () => {
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

  const authData = {
    user,
    setUser,
    createUser,
    // signIn,
    // logOut,
    // updateUser,
  };

 return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
