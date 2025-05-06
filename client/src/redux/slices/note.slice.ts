import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { convertHistory, createNote, deleteNote, getNoteHistory, getNotes, updateNote } from '../thunks/note.thunk';

interface NoteVersion {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface Note {
  id: string;
  title: string;
  description: string;
  history?: NoteVersion[];
}

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  selectedNoteHistory: NoteVersion[];  
  convertedText: string;              
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
  selectedNoteHistory: [],
  convertedText: '',
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
        state.notes = state.notes.filter((note) => note.id !== action.payload);
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
      })
      .addCase(getNoteHistory.fulfilled, (state, action: PayloadAction<NoteVersion[]>) => {
        
        state.selectedNoteHistory = action.payload.versions;
      })
      .addCase(getNoteHistory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(convertHistory.fulfilled, (state, action: PayloadAction<Note>) => {
        console.log("Convertor",action.payload);
        
      })
      
  },
});

export default noteSlice.reducer;
