import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyASC8utpLpxINC36rLWIqvbuXr17U8ANlY',
  authDomain: 'shop-46650.firebaseapp.com',
  databaseURL: 'https://shop-46650-default-rtdb.firebaseio.com',
  projectId: 'shop-46650',
  storageBucket: 'shop-46650.appspot.com',
  messagingSenderId: '1075615820227',
  appId: '1:1075615820227:web:83d35a4c13bcfd12943576',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
