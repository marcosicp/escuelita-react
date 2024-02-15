import { firebaseAuth, googleProvider } from "../config/constants";
// import firebase from "firebase/app";

// const provider = new firebase.auth.GoogleAuthProvider();

export function auth(email, pw) {
  return firebaseAuth.createUserWithEmailAndPassword(email, pw);
}

export function logout() {
  localStorage.clear();
  return firebaseAuth.signOut();
}

export function login(email, pw) {
  return firebaseAuth.signInWithEmailAndPassword(email, pw);
}

export function loginGoogle() {
  return firebaseAuth.signInWithPopup(googleProvider);
}

export function resetPassword(email) {
  return firebaseAuth.sendPasswordResetEmail(email);
}

export function currentUser(email) {
  return firebaseAuth.currentUser;
}

export function currentUserLocalStorage() {
  const loggedInUserCookie = localStorage.getItem("userEscuelitaReact");
  let loggedInUserObject = {};
  if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
    loggedInUserObject = JSON.parse(loggedInUserCookie);
  }

  return loggedInUserObject;
}

export function sendEmailVerification(email) {
  return firebaseAuth.currentUser.sendEmailVerification();
}
