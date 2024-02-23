// openFullPostSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOpenFullPostState {
  openFullPost: boolean;
  postId: string | null;
}

const initialState: IOpenFullPostState = {
  openFullPost: false,
  postId: null,
};

export const openFullPostSlice = createSlice({
  name: 'openFullPost',
  initialState,
  reducers: {
    setOpenFullPost(state, action: PayloadAction<string>) {
      state.openFullPost = true;
      state.postId = action.payload;
    },
    setCloseFullPost(state) {
      state.openFullPost = false;
      state.postId = null;
    },
  },
});

export const { setOpenFullPost, setCloseFullPost } = openFullPostSlice.actions;
export default openFullPostSlice.reducer;
