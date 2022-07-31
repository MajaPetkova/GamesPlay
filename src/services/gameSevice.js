import * as request from "./requester";


const baseUrl = 'http://localhost:3030';

// export const getAll = () => {
//    return fetch(`${baseUrl}/data/games`)
//    .then(res => res.json())

// }

export const getAll=()=>request.get(`${baseUrl}/data/games`);
export const create=(gameData)=>request.post(`${baseUrl}/data/games`, gameData)