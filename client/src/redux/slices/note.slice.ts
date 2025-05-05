import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { createNote, deleteNote, getNotes, updateNote } from '../thunks/note.thunk';

interface Note {
    id: string;  // Assuming each note has an id
    title: string;
    description: string;
}

interface NoteState {
    notes: Note[];  // Now it's an array of note objects
    loading: boolean;
    error: string | null;
}

const initialState: NoteState = {
    notes: [],
    loading: false,
    error: null,
};

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                console.log(action.payload);
               state.notes.notes.push(action.payload.note); 
            })
            .addCase(createNote.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
        .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.notes.notes = state.notes.notes.filter((note) => note.id !== action.payload.id);

        })
        .addCase(updateNote.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
            state.loading = false;
            console.log(action.payload);
            state.notes.notes = state.notes.notes.map((note) =>
                note.id === action.payload.note.id ? action.payload.note : note
            );
        })
        .addCase(updateNote.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
},
});

export default noteSlice.reducer;
