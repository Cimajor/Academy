import axios from "axios";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

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

export const _GetListOfReditNews = (searchTerm, searchLimit, sortBy) => {
  // const params = { page: 1, page_size: 15, search: skillName };

  var response = instance.get(`http://www.reddit.com/search.json?q=${searchTerm}&sort=top&limit=${searchLimit}`, {
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

//Professions   ============================
export const _CreateProfession = (body) => {
  FirebaseFirestoreService.createDocument("professions", body);
  // createDocument("companies", body);
};

export const _GetAllProfessions = (profetion) => {
  return FirebaseFirestoreService.readCollection(profetion);
};

export const _getProfessionById = (professionId) => {
  console.log(professionId);
  return FirebaseFirestoreService.readDocument("professions", professionId);
};

export const _AddSkillToProfession = (professionId, arrayToPush, valueToPush) => {
  return FirebaseFirestoreService.addValueToArray("professions", professionId, arrayToPush, valueToPush);
};

export const _getProfessionSkillsData = async (arrayOfIds) => {
  return await FirebaseFirestoreService.readDocumentsbyQuery("skills", arrayOfIds);
};

//Skills   ============================
export const _getSkillProfessionsData = async (skillId) => {
  return await FirebaseFirestoreService.readDocumentsByArray("professions", "skills", skillId);
};

export const _CreateSkill = async (body) => {
  return await FirebaseFirestoreService.createDocument("skills", body);
  // createDocument("companies", body);
};

export const _GetAllSkills = async () => {
  return await FirebaseFirestoreService.readCollection("skills");
};

export const _GetSkillById = async (skillId) => {
  return FirebaseFirestoreService.readDocument("skills", skillId);
};

//User   ============================
export const _AddSkillsToUser = (userId, valueToPush) => {
  return FirebaseFirestoreService.addArrayToArray("users", userId, "data.learnedSkills", valueToPush);
};

export const _CreateUser = async (userId, body) => {
  return await FirebaseFirestoreService.createDocument("users", { uid: userId, data: body });
};

export const _GetUser = async (userId) => {
  return await FirebaseFirestoreService.readQueryWhere("users", "uid", userId);
};

export const _ApplyForProfession = async (userId, professionId) => {
  return FirebaseFirestoreService.addValueToArray("users", userId, "appliedProfessions", professionId);
};

export const _getUserAppliedSkillsData = async (listOfSkills) => {
  return await FirebaseFirestoreService.readDocumentsbyQuery("professions", listOfSkills);
};

//Source   ============================
export const _CreateSource = async (body) => {
  return await FirebaseFirestoreService.createDocument("source", body);
};

export const _getAllSkillSources = async (skillId) => {
  return await FirebaseFirestoreService.readDocumentsByArray("source", "tags", skillId);
};
