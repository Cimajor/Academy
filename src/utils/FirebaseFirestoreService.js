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

const readDocument = async (collectionName, documentId) => {
  try {
    const documentToGet = doc(firestore, collectionName, documentId);
    return await getDoc(documentToGet);
  } catch (e) {
    console.error(e);
  }
};

const deleteDocument = (collection, id) => {
  return firestore.collection(collection).doc(id).delete();
};

const readDocumentsbyQuery = async (collectionId, arrayOfWalues) => {
  const q = query(collection(firestore, collectionId), where(documentId(), "in", arrayOfWalues));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const readCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const readDocumentsByArray = async (collectionId, fieldToCheck, skillId) => {
  const q = query(collection(firestore, collectionId), where(fieldToCheck, "array-contains", skillId));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const readQueryWhere = async (collectionName, field, value) => {
  const q = query(collection(firestore, collectionName), where(field, "==", value));
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

const addValueToArray = async (collection, documentId, array, value) => {
  const collectionToUpdate = doc(firestore, collection, documentId);
  await updateDoc(collectionToUpdate, {
    [array]: arrayUnion(value),
  });
};

const addArrayToArray = async (collection, documentId, array, value) => {
  const collectionToUpdate = doc(firestore, collection, documentId);
  await updateDoc(collectionToUpdate, {
    [array]: arrayUnion(...value),
  });
};

export const getAllSkillSources = async (skillId) => {
  // return await FirebaseFirestoreService.readDocumentsByArray("sources", "tags", { id: `${skillId}` });
  console.log(skillId);
  const q = query(
    collection(firestore, "sources"),
    where("tags", "array-contains", [{ id: `5bB3SraFU1cC2RcvvLKy`, title: "Css" }])
  );
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

const FirebaseFirestoreService = {
  createDocument,
  readCollection,
  updateDocument,
  deleteDocument,
  addValueToArray,
  readDocument,
  readDocumentsbyQuery,
  readDocumentsByArray,
  readQueryWhere,
  getAllSkillSources,
  addArrayToArray,
};

export default FirebaseFirestoreService;
