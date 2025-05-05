import { createNoteAPI, deleteNoteAPI, getNotesAPI, updateNoteAPI } from "@/api/noteAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNotes = createAsyncThunk(
    'notes/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getNotesAPI();
            console.log("Data", response)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notes');
        }
    }
);

export const createNote = createAsyncThunk(
    'notes/create',
    async (note: string, { rejectWithValue }) => {
        try {
            const response = await createNoteAPI(note);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create note');
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await deleteNoteAPI(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete note');
        }
    }
);

export const updateNote = createAsyncThunk(
    'notes/update',
    async ({ id, note }: { id: string;note:{ title: string, description: string, password?: string }}, { rejectWithValue }) => {
        try {
            const response = await updateNoteAPI(id, note);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update note');
        }
    }
);