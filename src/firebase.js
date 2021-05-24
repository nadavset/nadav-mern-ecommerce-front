
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpJFJuBpkQCPYhLuZCVjWBLXPNXpGofIE",
  authDomain: "ecommerce-c8160.firebaseapp.com",
  databaseURL: "https://ecommerce-c8160.firebaseio.com",
  projectId: "ecommerce-c8160",
  storageBucket: "ecommerce-c8160.appspot.com",
  messagingSenderId: "925734848489",
  appId: "1:925734848489:web:e0ad191b36dc93f3656d78"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();