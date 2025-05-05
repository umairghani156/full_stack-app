import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import notesReducer from './slices/note.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
