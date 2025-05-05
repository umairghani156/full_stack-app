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
                state.notes.push(action.payload);
            })
            .addCase(createNote.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                console.log('STATE NOTES BEFORE DELETE:', state.notes);
                // Delete the note by its id
                state.notes = state.notes.filter((note) => note.id !== action.payload);
                console.log('STATE NOTES AFTER DELETE:', state.notes);
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                state.notes = state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                );
            })
            .addCase(updateNote.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default noteSlice.reducer;
