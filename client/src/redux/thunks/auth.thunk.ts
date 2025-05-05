import { loginUserAPI, registerUserAPI } from "@/api/authAPI";
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