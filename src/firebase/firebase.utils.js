import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config={
    apiKey: "AIzaSyAWdkTF-apv5dXoe5O86XslYeaaT6OTi78",
    authDomain: "crwn-db-11c17.firebaseapp.com",
    projectId: "crwn-db-11c17",
    storageBucket: "crwn-db-11c17.appspot.com",
    messagingSenderId: "935091968654",
    appId: "1:935091968654:web:70eb04d40fffc3fec1c7df",
    measurementId: "G-WWZ9SNJ6PG"
  }

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export  const firestore=firebase.firestore();


  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:"select_account"});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase; 