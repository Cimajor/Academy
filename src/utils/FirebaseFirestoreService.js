import { firestore } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// const firestore = firebase.firestore();

const createDocument = async (collectionToCreate, document) => {
  //   return firestore.collection(collection).add(document);

  // Add a new document in collection "cities"
  try {
    const docRef = await addDoc(collection(firestore, collectionToCreate), document);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const readDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};

// const readDocuments = async ({ collection, queries, orderByField, orderByDirection, perPage, cursorId }) => {
//   let collectionRef = firestore.collection(collection);

//   if (queries && queries.length > 0) {
//     for (const query of queries) {
//       collectionRef = collectionRef.where(query.field, query.condition, query.value);
//     }
//   }

//   if (orderByField && orderByDirection) {
//     collectionRef = collectionRef.orderBy(orderByField, orderByDirection);
//   }

//   if (perPage) {
//     collectionRef = collectionRef.limit(perPage);
//   }

//   if (cursorId) {
//     const document = await readDocument(collection, cursorId);

//     collectionRef = collectionRef.startAfter(document);
//   }

//   return collectionRef.get();
// };

const updateDocument = (collection, id, document) => {
  return firestore.collection(collection).doc(id).update(document);
};

const deleteDocument = (collection, id) => {
  return firestore.collection(collection).doc(id).delete();
};

const FirebaseFirestoreService = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};

export default FirebaseFirestoreService;
