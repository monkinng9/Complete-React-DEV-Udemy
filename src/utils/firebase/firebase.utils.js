import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirebase,
  doc,
  getDoc,
  setDoc,
  getFirestore
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe-kPD5vd1mKPCiuUHOAXL0_hX6XBE1XY",
  authDomain: "crwn-clothing-db-eb341.firebaseapp.com",
  projectId: "crwn-clothing-db-eb341",
  storageBucket: "crwn-clothing-db-eb341.appspot.com",
  messagingSenderId: "841158844777",
  appId: "1:841158844777:web:c058f38897393f83b81df8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef  = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};