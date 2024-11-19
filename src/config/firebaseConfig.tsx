// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiHy_mCdvwP9v-JE5RL3uZSy-d8wD_yUo",
  authDomain: "attend-ease-nsshss-kavalam.firebaseapp.com",
  projectId: "attend-ease-nsshss-kavalam",
  storageBucket: "attend-ease-nsshss-kavalam.firebasestorage.app",
  messagingSenderId: "636393575715",
  appId: "1:636393575715:web:5ddaa4f05433f2991b2896",
  measurementId: "G-GQLKQFCHLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Analytics only in the browser
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
