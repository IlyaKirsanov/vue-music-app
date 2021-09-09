import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAkG--e0f5yTfV12u8bTsUzfxHgXNl2qqQ',
  authDomain: 'music-app-udemy-vue3.firebaseapp.com',
  projectId: 'music-app-udemy-vue3',
  storageBucket: 'music-app-udemy-vue3.appspot.com',
  messagingSenderId: '448759355521',
  appId: '1:448759355521:web:6a7dacdc3b0e4f1c90d580',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};
