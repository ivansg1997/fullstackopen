import axios from 'axios'
const baseUrl = '/api/persons'

const GetAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const Create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const Update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const Delete = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { GetAll, Create, Update, Delete }