
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCAGZelYfwaRkdAiCMLPUMeDiwIZI8jDhQ",
  authDomain: "examnotes-8bbd3.firebaseapp.com",
  projectId: "examnotes-8bbd3",
  storageBucket: "examnotes-8bbd3.firebasestorage.app",
  messagingSenderId: "447543098814",
  appId: "1:447543098814:web:a0758a7b8b691154ad4def"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }