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

export const getProfileUser = async () => {
    const response = await api.get('/auth/get_profile', {
        withCredentials: true
    });
    return response.data;
};

export const updateProfileAPI = async (credentials: {id: string; name: string; email: string; 
    newPassword: string;
oldPassword: string
 }) => {
    const response = await api.put(`/auth/update_profile/${credentials.id}`, {
        name: credentials.name,
        email: credentials.email,
        newPassword: credentials.newPassword,
        oldPassword: credentials.oldPassword
    },{
        withCredentials: true
    });
    return response.data;
}