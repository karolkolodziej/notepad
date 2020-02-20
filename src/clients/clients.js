import axios from "axios";

import { API_URL } from "../API/API";

export const saveNote = async content => {
  await axios.post(API_URL, content);
};

export const getDataFromServer = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteNote = async param => {
  axios.delete(param);
};

export const changeState = () => {
  return 1;
};
