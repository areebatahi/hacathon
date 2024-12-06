import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { getFirestore, doc, setDoc, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, where } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyCpEubZ_9Uyq8sS_Rs45MnkKuuCrDP0mCc",
    authDomain: "fir-project-4f9d5.firebaseapp.com",
    projectId: "fir-project-4f9d5",
    storageBucket: "fir-project-4f9d5.firebasestorage.app",
    messagingSenderId: "999036777326",
    appId: "1:999036777326:web:fe87056fbcfdc838bd477f",
    measurementId: "G-3JGHM3XL30"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, provider, getFirestore, db, setDoc, doc, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, where 
}