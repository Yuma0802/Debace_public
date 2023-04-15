import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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


export const signupWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            await user.sendEmailVerification();
            alert('アカウントが作成されました。確認メールを送信しました。');
        }

        //メール認証なし時のメッセージ
        firebase.auth().onAuthStateChanged((user) => {
            if (user && !user.emailVerified) {
              alert('メールアドレスの確認が必要です。確認メールを送信しました。');
              user.sendEmailVerification();
              firebase.auth().signOut();
            }
          });

          return user;
    } catch (error) {
        let errorMessage = 'アカウントの作成中にエラーが発生しました。';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'このメールアドレスは既に使用されています。';
                break;
            case 'auth/weak-password':
                errorMessage = 'パスワードが弱すぎます。';
                break;
            case 'auth/invalid-email':
                errorMessage = 'メールアドレスが無効です。';
                break;
            default:
                console.log(error);
                break;
        }
        
        alert(errorMessage);
        throw error;
    }
};



//以下ベータ版

// export const signupWithEmailAndPassword = async (email, password) => {
//     try {
//         const user = await firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password);

//         await firebase.auth().currentUser.sendEmailVerification();

//         alert('登録成功しました');

//         return user;
//     } catch (error) {
//         alert('登録済みです');
//         console.log(error);
//     }
// };