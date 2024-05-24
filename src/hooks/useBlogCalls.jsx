import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  addCommentSuccess,
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getCommentsSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const getBlog = async (path = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/${path}`);
      dispatch(getBlogSuccess({ stockData: data.data, path }));
    } catch (error) {
      toastErrorNotify(`${path} verileri çekilememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const getBlogComments = async (blogId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/comments?blogId=${blogId}`);
      dispatch(getCommentsSuccess({ blogId, comments: data.comments }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const addComment = async (blogId, text) => {
    try {
      const { data } = await axiosToken.post(`/comments`, { blogId, text });
      dispatch(addCommentSuccess({ blogId, comment: data.comment }));
      toastSuccessNotify("Comment added successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to add comment.");
      console.log(error);
    }
  };
  const deleteBlog = async (path = "blogs", id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}`);
      toastSuccessNotify(`${path} basariliyla silinmiştir.`);
      getBlog(path);
    } catch (error) {
      toastErrorNotify(`${path} silinememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const postBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${path}/`, info);
      getBlog(path);
      toastSuccessNotify(`${path} basariliyla eklenmiştir.`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${path} eklenememiştir.`);
      console.log(error);
    }
  };
  const putBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`/${path}/${info._id}`, info);
      getBlog(path);
      toastSuccessNotify(`${path} basariliyla guncellenmiştir.`);
    } catch (error) {
      toastErrorNotify(`${path} guncellenememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const getUserBlogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/blogs?author=${user._id}`);
      dispatch(getBlogSuccess({ stockData: data.data, path: "blogs" }));
    } catch (error) {
      toastErrorNotify(`Kullanıcı blogları çekilememiştir.`);
      dispatch(fetchFail());
      console.error(error);
    }
  };
  return {
    getBlog,
    deleteBlog,
    postBlog,
    putBlog,
    getBlogComments,
    addComment,
    getUserBlogs,
  };
};
export default useBlogCalls;
