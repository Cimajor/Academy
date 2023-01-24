import axios from "axios";
import firebase from "./firebase";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import { doc, setDoc } from "firebase/firestore"; 

const auth = firebase.auth;

const userID = "24fSmp7Jmc7nWnniwtQB3fb3JORSDGZ24X8uXORb";
const userSecret =
  "3truDyYzYvdWqXh29snghiIIARJadCurlxLBk3n96QcuS19IcgTNdrlM2Ze75oHIClkCNrVak6nqnc0kXUSygnZ4Q6ZcZ5KwEstP1LiBC9n55nzPW2tCzwGYQCxoW3E8";
const udemyURL = "https://www.udemy.com/api-2.0";

const getHeader = async () => {
  const headers = {
    Authorization: {
      username: userID,
      password: userSecret,
    },
    // Accept: `${apiConfig.header.Accept}`,
    // 'Content-Type': 'application/json',
  };
  return headers;
};

const instance = axios.create({
  baseURL: udemyURL,
  headers: getHeader(),
});

export const _GetListOfSources = (skillName) => {
  const params = { page: 1, page_size: 15, search: skillName };

  var response = instance.get(`${udemyURL}/courses/?page=1&search=${skillName}&page_size=15&language=en`, {
    auth: {
      username: userID,
      password: userSecret,
    },
  });

  response.then().catch();
  return response;
};

// export const createDocument = (collection, document) => {
//   return db.collection(collection).document(document);
// };

export const _CreateProfession = (body) => {
  FirebaseFirestoreService.createDocument("professions", body);
  // createDocument("companies", body);
};

export const _GetAllProfessions = (profetion) => {
  return FirebaseFirestoreService.readDocuments(profetion)
}