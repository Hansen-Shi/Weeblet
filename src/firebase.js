import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD1fGYFJcG8xvIDWwfULkzQo1t97GAFo9s',
  authDomain: 'breadit-9f380.firebaseapp.com',
  databaseURL: 'https://breadit-9f380.firebaseio.com',
  projectId: 'breadit-9f380',
  storageBucket: 'breadit-9f380.appspot.com',
  messagingSenderId: '208721896568',
  appId: '1:208721896568:web:3a010b595483f16241398d',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
