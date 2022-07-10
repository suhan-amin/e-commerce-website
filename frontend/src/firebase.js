import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

 const firebaseConfig = {
    apiKey: "AIzaSyBBVMa1ClkAxxtUUfzloXSSIszeaSplvCc",
    authDomain: "e-app-f9ce1.firebaseapp.com",
    projectId: "e-app-f9ce1",
    storageBucket: "e-app-f9ce1.appspot.com",
    messagingSenderId: "446367423408",
    appId: "1:446367423408:web:181828e52abd3218a2d475"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db,auth};