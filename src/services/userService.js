import axios from "../axios";
//
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
    //kiem tra email, password truyen vao phia o userController
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

export { handleLoginApi, getAllUsers, createNewUserService }