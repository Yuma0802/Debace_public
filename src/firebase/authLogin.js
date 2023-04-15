import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyChy78yS4XWv7tnK9McuJNc_6tzHeK_HGM",
  authDomain: "debace-app.firebaseapp.com",
  projectId: "debace-app",
  storageBucket: "debace-app.appspot.com",
  messagingSenderId: "581374008396",
  appId: "1:581374008396:web:963b8d42ba66fd6c9fa8e9",
  measurementId: "G-9LBWZ36F99"
};

firebase.initializeApp(firebaseConfig);

export const signinWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    alert('ログイン失敗しました');
    console.log(error);
  }
};

export const signout = async () => {
  try {
    const user = firebase.auth().currentUser;
    console.log('サインアウト前 : ', user);

    await firebase.auth().signOut();

    console.log('サインアウト後 : ', firebase.auth().currentUser);
  } catch (error) {
    console.log(error);
  }
};


//ベータ版
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyChy78yS4XWv7tnK9McuJNc_6tzHeK_HGM",
//   authDomain: "debace-app.firebaseapp.com",
//   projectId: "debace-app",
//   storageBucket: "debace-app.appspot.com",
//   messagingSenderId: "581374008396",
//   appId: "1:581374008396:web:963b8d42ba66fd6c9fa8e9",
//   measurementId: "G-9LBWZ36F99"
// };

// firebase.initializeApp(firebaseConfig);

// export const signinWithEmailAndPassword = async (email, password) => {
//     try {
//         const user = await firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password);

//         alert('ログイン成功したんだお');

//         return user;
//     } catch (error) {
//         alert('ログイン失敗なんだお');
//         console.log(error);
//     }
// };

// export const signout = async () => {
//     const user1 = await firebase.auth().currentUser;
//     console.log('サインアウト前 : ', user1);

//     await firebase.auth().signOut();
    
//     const user2 = await firebase.auth().currentUser;
//     console.log('サインアウト後 : ' , user2)
// };