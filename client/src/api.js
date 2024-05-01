// api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const addUser = (user) => axios.post(`${BASE_URL}/users`, user);

export const getCategories = () => axios.get(`${BASE_URL}/category`);
export const addCategory = (category) =>
  axios.post(`${BASE_URL}/category`, category);

export const getTransactions = () => axios.get(`${BASE_URL}/transactions`);
export const addTransaction = (transaction) =>
  axios.post(`${BASE_URL}/transactions`, transaction);
