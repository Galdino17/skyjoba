
import "firebase/auth";

import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"




const firebaseConfig = {
    apiKey: "AIzaSyBzud3Hx53aCLyuV9Fz-pqWMDX9IGXy0C8",
    authDomain: "skyjo-732b9.firebaseapp.com",
    projectId: "skyjo-732b9",
    storageBucket: "skyjo-732b9.appspot.com",
    messagingSenderId: "959707803838",
    appId: "1:959707803838:web:30e771dbad3432471eaeef"

}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)


const provider = new GoogleAuthProvider();


export function verificaSeLogado(){
  if (!auth.currentUser) return false
  else return true
}

export function CurrentInfo(info){
  if (!auth.currentUser) return ''
  else return auth.currentUser[info]
}


export function deslogar() {
  
  signOut(auth)
}

export async function logar() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return user
        
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

      

    

 
}


// signInWithRedirect(auth, provider);


// signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // ...
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });

// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });



export {db, auth, app}