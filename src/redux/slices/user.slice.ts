import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

interface RegisterUserData {
  avatarUrl?: string;
  userName: string;
  email: string;
  password: string;
}

export const fetchRegisterUser: any = createAsyncThunk(
  'users/fetchRegisterUser',
  async (data: RegisterUserData) => {
    const res = await axios.post('/user/register', data);
    return res.data;
  },
);

export const fetchLoginUser: any = createAsyncThunk(
  'users/fetchLoginUser',
  async (data: RegisterUserData) => {
    const res = await axios.post('/user/login', data);
    return res.data;
  },
);

export const fetchAuthMe: any = createAsyncThunk('users/fetchAuthMe', async () => {
  const res = await axios.get('/user/get/me');
  return res.data;
});

interface IUserTypes {
  currentUser: string[] | null;
  isLoading: boolean;
}

const initialState: IUserTypes = {
  currentUser: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(fetchRegisterUser.pending, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchRegisterUser.rejected, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    // login
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchLoginUser.rejected, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    // auth me
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
  },
});

export const isAuthenticated = (state: { user: IUserTypes }) => Boolean(state.user.currentUser);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
