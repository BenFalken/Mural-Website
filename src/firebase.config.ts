import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyAlBnY4J9pI-upnur7JC8vAeOi1k7u5TAg",
    authDomain: "bae-initiative.firebaseapp.com",
    databaseURL: "https://bae-initiative.firebaseio.com",
    projectId: "bae-initiative",
    storageBucket: "bae-initiative.appspot.com",
    messagingSenderId: "816503395098",
    appId: "1:816503395098:web:5fc1ffbf71a87ba91a52a3",
    measurementId: "G-S8Q3MSZCBL"
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const currentUser = auth.currentUser
const Authentication = firebase.auth
const googleAuthProvider = firebase.auth.GoogleAuthProvider

// firebase collections

// firebase functions
const functions = firebase.functions();

export default {
    db,
    auth,
    currentUser,
    Authentication,
    googleAuthProvider,
    functions,
    storage
}