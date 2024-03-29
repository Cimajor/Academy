import axios from 'axios';


let userID = "24fSmp7Jmc7nWnniwtQB3fb3JORSDGZ24X8uXORb"
let userSecret = "3truDyYzYvdWqXh29snghiIIARJadCurlxLBk3n96QcuS19IcgTNdrlM2Ze75oHIClkCNrVak6nqnc0kXUSygnZ4Q6ZcZ5KwEstP1LiBC9n55nzPW2tCzwGYQCxoW3E8"
let udemyURL = "https://www.udemy.com/api-2.0"

const getHeader = async () => {
  const headers = {
    Authorization: {
        username: userID,
        password: userSecret
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

    var response = instance.get(`${udemyURL}/articipants/legal-entities`, params, {
      headers: { 'Content-Type': 'application/json' },
      maxRedirects: 0,
    });
  
    response.then().catch();
    return response;
  };
