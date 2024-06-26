import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  blogs: [],
  categories: [],
  comments: [],
  likes: [],
  singleBlog: [],

  loading: false,
  error: null,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },

    getBlogSuccess: (state, { payload: { path, blogData } }) => {
      state.loading = false;
      state[path] = blogData;
    },

    getSingleBlogSuccess: (state, { payload }) => {
      // console.log(payload);
      state.loading = false;
      state.singleBlog = payload.data;
    },

    likeSuccess: (state, { payload }) => {
      state.loading = false;
      state.likes = payload;
    },

    getCommentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.comments = payload.data;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  fetchStart,
  fetchFail,
  getBlogSuccess,
  getCommentsSuccess,
  likeSuccess,
  getSingleBlogSuccess,
} = blogSlice.actions;
export default blogSlice.reducer;
