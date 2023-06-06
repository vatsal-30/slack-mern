import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSc6zoPdKXklfxIYSo-QQRV9LENsfVOOw",
    authDomain: "slack-clone-2e4f3.firebaseapp.com",
    databaseURL: "https://slack-clone-2e4f3-default-rtdb.firebaseio.com",
    projectId: "slack-clone-2e4f3",
    storageBucket: "slack-clone-2e4f3.appspot.com",
    messagingSenderId: "89937388839",
    appId: "1:89937388839:web:0277bb67a396a36f6a3502",
    measurementId: "G-KHL78FEHXX"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db