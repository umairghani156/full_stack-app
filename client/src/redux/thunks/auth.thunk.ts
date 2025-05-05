import { getProfileUser, loginUserAPI, registerUserAPI, updateProfileAPI } from "@/api/authAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: {name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
    const response = await registerUserAPI(credentials);
    return response;
    } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
)
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await loginUserAPI(credentials);
        console.log("Data", response)
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
    }
  );

export const getProfile = createAsyncThunk(
    'auth/profile',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getProfileUser();
        console.log("Data", response)
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
    }
  );

export const updateProfile = createAsyncThunk(
    'auth/update_profile',
    async (credentials: {id: string; name: string; email: string; newPassword: string;
      oldPassword: string}, { rejectWithValue }) => {
      try {
        const response = await updateProfileAPI(credentials);
        console.log("Data", response)
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
    }
)