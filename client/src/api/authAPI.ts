import api from "./axios";


export const registerUserAPI = async (credentials: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
    },{
        withCredentials: true
    });
    return response.data;
}
export const loginUserAPI = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
    },{
        withCredentials: true
    });
    return response.data;
};