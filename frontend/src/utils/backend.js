import axios from 'axios';

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } };

export async function getUser(userId) {
  const response = await axios.get(`/api/users/${userId}`);
  return response;
}

export async function updateUser(data, id) {
  const response = await axios.put(`/api/users/${id}`, data);
  return response;
}

export async function deleteUser(userId) {
  console.log('dele' + userId)
  const {response} = await axios.delete(`/api/users/${userId}`);
  return response;
}

export async function logIn(data) {
  const response = await axios.post('/api/users/login', data);
  return response.data;
}

export async function signUp(data) {
    const response = await axios.post('/api/users/signup', data);
    return response;
  }

export async function setSeed(data) {
    const response = await axios.post('/api/seed', data);
    return response;
  }

export async function getChallenge(challengeId) {
  const response = await axios.get(`/api/challenge/${challengeId}`);
  return response;
}