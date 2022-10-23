import axios from 'axios';

const doRequest = (method, endpoint, body) => {
  const url = `http://localhost:3001/persons/${endpoint}`;
  const request = body ? method(url, body) : method(url);
  return request.then((response) => response.data);
};

const getAll = () => {
  return doRequest(axios.get, '', null);
};

const getOne = (id) => {
  return doRequest(axios.get, id, null);
};
const create = (newObject) => {
  return doRequest(axios.post, '', newObject);
};

const update = (id, newObject) => {
  return doRequest(axios.put, id, newObject);
};

const deleteOne = (id) => {
  return doRequest(axios.delete, id, null);
};

const service = { getAll, getOne, create, update, deleteOne };

export default service;
