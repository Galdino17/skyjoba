
import "firebase/auth";
import "firebase/firestore";

import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

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

export {db, auth}