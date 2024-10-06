// Firebase Config

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAOuxXO4MtRrlpn-VSw0jGeCADmnuvmtOg",
    authDomain: "ludo-19271.firebaseapp.com",
    projectId: "ludo-19271",
    storageBucket: "ludo-19271.appspot.com",
    messagingSenderId: "491848755579",
    appId: "1:491848755579:web:f3476181139e757559b5de",
    measurementId: "G-HFES0RVZQ2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

