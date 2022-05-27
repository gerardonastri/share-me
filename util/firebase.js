// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsOnHPgeg_kGBDwHyhXNXnlmE5QvyqJ08",
  authDomain: "share-me-26f24.firebaseapp.com",
  projectId: "share-me-26f24",
  storageBucket: "share-me-26f24.appspot.com",
  messagingSenderId: "338348407269",
  appId: "1:338348407269:web:62473cd469accd2aa4170c"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();
export default storage