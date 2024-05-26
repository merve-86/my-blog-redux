import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  blogs: [],
  categories: [],
  comments: {},
  isLoading: false,
  error: null,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload.stockData;
    },
    getCommentsSuccess: (state, action) => {
      state.isLoading = false;
      state.comments[action.payload.blogId] = action.payload.comments;
    },
    addCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.comments[action.payload.blogId].push(action.payload.comment);
    },
  },
});
export const {
  fetchStart,
  fetchFail,
  getBlogSuccess,
  getCommentsSuccess,
  addCommentSuccess,
} = blogSlice.actions;
export default blogSlice.reducer;
