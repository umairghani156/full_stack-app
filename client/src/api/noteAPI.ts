import api from "./axios";

export const getNotesAPI = async () =>{
    const response = await api.get('/notes');
    return response.data;
};

export const createNoteAPI = async (note: { title: string; description: string; password?: string }) => {
    const response = await api.post('/notes/create', { 
        title: note.title,
        description: note.description,
        password: note.password
     });
    return response.data;
};

export const deleteNoteAPI = async (id: string) => {
    const response = await api.delete(`/notes/delete-note/${id}`);
    return response.data;
};

export const updateNoteAPI = async (data: { id: string; title: string; description: string; password?: string }) => {
    const response = await api.put(`/notes/${data.id}`, { 
        title: data.title,
        description: data.description,
        password: data.password
     });
    return response.data;
};

export const getNoteHistoryAPI = async (id: string) => {
    const response = await api.get(`/note-versions/get-all/${id}`);
    return response.data;
};

export const convertNoteHistoryAPI = async (id: string, versionId: string) => {
    const response = await api.put(`/note-versions/${id}/revert/${versionId}`);
    return response.data;
};

