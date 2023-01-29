import { firestore } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
  query,
  where,
  documentId,
} from "firebase/firestore";

// const firestore = firebase.firestore();

const createDocument = async (collectionToCreate, document) => {
  const docRef = await addDoc(collection(firestore, collectionToCreate), document);
  return docRef;
};

const readCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const readDocument = async (collectionName, documentId) => {
  try {
    const documentToGet = doc(firestore, collectionName, documentId);
    return await getDoc(documentToGet);
  } catch (e) {
    console.error(e);
  }
};

const readDocumentsbyQuery = async (collectionId, arrayOfWalues) => {
  const q = query(
    collection(firestore, collectionId),
    where(documentId(), "in", arrayOfWalues)
  );
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const readProfessionsRelatedToSkill = async (collectionId, skillId) => {
  const q = query(
    collection(firestore, collectionId),
    where("skills", "array-contains", skillId)
  );
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const updateDocument = async (collection, professionId, updateBody) => {
  const collectionToUpdate = doc(firestore, collection, professionId);
  await updateDoc(collectionToUpdate, updateBody);
};

const addValueToArray = async (collection, professionId, array, value) => {
  const collectionToUpdate = doc(firestore, collection, professionId);
  await updateDoc(collectionToUpdate, {
    [array]: arrayUnion(value),
  });
};

const deleteDocument = (collection, id) => {
  return firestore.collection(collection).doc(id).delete();
};

const FirebaseFirestoreService = {
  createDocument,
  readCollection,
  updateDocument,
  deleteDocument,
  addValueToArray,
  readDocument,
  readDocumentsbyQuery,
  readProfessionsRelatedToSkill
};

export default FirebaseFirestoreService;
