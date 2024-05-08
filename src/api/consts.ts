import axios from 'axios'

const BASE_URL = 'http://localhost:3005'
const BASE_URL_PHOTO = 'https://pixabay.com/api/'


export const $api = axios.create({
  baseURL: BASE_URL,
});

export const $apiPhoto = axios.create({
  baseURL: BASE_URL_PHOTO,
});