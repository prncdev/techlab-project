import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { UserDetail } from '../constants/interfaces';
import authService from './authServices';

// Bringing the user session ID from the local storage.
const sessionToken = localStorage.getItem('userToken');
const userToken: string | null = sessionToken ? JSON.parse(sessionToken) : null;

const handleError = function (error: any) {
  const err =
    (error?.response && error?.response.data && error?.response.data.message) ||
    error.message ||
    error.toString();
  return err;
};

type StateProps = {
  user: string | null;
  projectList: any[];
  message: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

// Initial state setup.
const initialState: StateProps = {
  user: userToken,
  projectList: [],
  message: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// fetch project list.
export const getProject: any = createAsyncThunk(
  'auth/projects',
  async function (thunkAPI: GetThunkAPI<AsyncThunkConfig>) {
    try {
      return await authService.fetchProject();
    } catch (error: any) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add new Project details.
export const addProject: any = createAsyncThunk(
  'auth/create-project',
  async function (
    formData: any,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) {
    try {
      return await authService.createProject(formData);
    } catch (error: any) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Project Status.
export const updateStatus: any = createAsyncThunk(
  'auth/update-project',
  async function (
    formData: {id: string, status: any},
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) {
    try {
      const { id, status } = formData;
      console.log(status);
      return await authService.updateStatus(id, status);
    } catch (error: any) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const me: any = createAsyncThunk(
  'auth/me',
  async function (
    token: string | null,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) {
    try {
      return await authService.me(token);
    } catch (error: any) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logs in the user.
export const login: any = createAsyncThunk(
  'auth/login',
  async function (user: UserDetail, thunkAPI: GetThunkAPI<AsyncThunkConfig>) {
    try {
      return await authService.login(user);
    } catch (error) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logs out the user.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: function (state) {
      state.message = '';
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },

  extraReducers: function (builder) {
    builder
      .addCase(login.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getProject.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(getProject.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectList = action.payload;
      })
      .addCase(getProject.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addProject.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addProject.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateStatus.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectList = action.payload;
      })
      .addCase(updateStatus.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(me.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(me.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
