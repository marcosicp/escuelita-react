import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const app = firebase.initializeApp({
 
});

firebase.analytics();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment(1);

export const firebaseAuth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// PRODUCTION
export default app;

// TEST
export { projectFirestore, timestamp, increment };
