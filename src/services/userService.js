import axios from "../axios";
//
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
    //kiem tra email, password truyen vao phia o userController
}

export { handleLoginApi }