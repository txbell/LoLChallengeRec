import axios from 'axios';

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } };

export async function getUser(userId) {
  const response = await axios.get(`/users/${userId}`);
  return response;
}

export async function signUp(data) {
  const response = await axios.post('/users/signup', data);
  return response;
}

export async function updateUser(userId, data) {
  const response = await axios.put(`/users/${userId}`, data);
  return response;
}

export async function deleteUser(userId) {
  const {response} = await axios.delete(`/users/${userId}`);
  return response;
}

export async function logIn(data) {
  const {response} = await axios.put('/users/login', data);
  return response;
}