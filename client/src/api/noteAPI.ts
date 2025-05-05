import api from "./axios";

export const getNotesAPI = async () =>{
    const response = await api.get('/notes');
    return response.data;
};

export const createNoteAPI = async (note: string) => {
    const response = await api.post('/notes/create', { note });
    return response.data;
};

export const deleteNoteAPI = async (id: string) => {
    const response = await api.delete(`/notes/delete-note/${id}`);
    return response.data;
};

export const updateNoteAPI = async (id: string, data:{
    title: string;
    description: string;
    password?: string;
}) => {
    const response = await api.put(`/notes/${id}`, { 
        title: data.title,
        description: data.description,
        password: data.password
     });
    return response.data;
}

