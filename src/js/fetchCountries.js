import { BASE_URL } from './constants';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

export default function fetchCountries(searchQuery) {
  return axios(`/${searchQuery}`).then(r => r.data);
}

// fetch, давай до свидания :D

// export default function fetchCountries(searchQuery) {
//   return fetch(`${BASE_URL}/${searchQuery}`).then(r => {
//     if (r.ok) {
//       return r.json();
//     }

//     throw new Error();
//   });
// }
