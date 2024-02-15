import { projectFirestore } from "../config/constants";

export function getAlumnoByUID(user) {
  return projectFirestore.collection(`alumnos`).doc(user.uid).get();
}

export function getAlumnoByEmail(email) {
  return projectFirestore
    .collection(`alumnos`)
    .where("email", "==", email).limit(1).get();
}
