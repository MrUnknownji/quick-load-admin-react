import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "moving-rolls-707e9.firebaseapp.com",
  projectId: "moving-rolls-707e9",
  storageBucket: "moving-rolls-707e9.appspot.com",
  messagingSenderId: "350925667583",
  appId: "1:350925667583:web:ba9e8dc9e9222e03a9a0ca",
  measurementId: "G-NYD9J9ZTX9",
};
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export const initializeRecaptcha = (elementId: string) => {
  return new RecaptchaVerifier(auth, elementId, {
    size: "invisible",
    callback: () => {},
  });
};
