import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCt6UdsrTLc42BGyIRtPZsNBh0puJDigds",
    authDomain: "api-project-57853354722.firebaseapp.com",
    databaseURL: "https://api-project-57853354722.firebaseio.com",
    projectId: "api-project-57853354722",
    storageBucket: "api-project-57853354722.appspot.com",
    messagingSenderId: "57853354722",
    appId: "1:57853354722:web:c15c899351fdf2507c74bb",
    measurementId: "G-J61CTRXY67"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase