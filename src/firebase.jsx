import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB1ea6tM-WA30Z3X4199uuhVveYZETUJW8",
  authDomain: "sampleapp-8b39a.firebaseapp.com",
  projectId: "sampleapp-8b39a",
  storageBucket: "sampleapp-8b39a.firebasestorage.app",
  messagingSenderId: "541612793070",
  appId: "1:541612793070:web:398cd368efd45de98567ff",
  measurementId: "G-QRSPY10C3E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
