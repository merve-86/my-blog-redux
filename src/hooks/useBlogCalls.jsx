import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getCommentsSuccess,
  getSingleBlogSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { axiosToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getBlog = async (path = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/${path}?page=&limit=50`);
      const blogData = data.data;
      dispatch(getBlogSuccess({ blogData, path }));
    } catch (error) {
      toastErrorNotify(`${path} verileri çekilememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getVisitBlog = async (path = "blogs", id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.get(`/${path}/${id}`);
    } catch (error) {
      toastErrorNotify(`${path} veriler çekilememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postLike = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/blogs/${id}/postLike`);
    } catch (error) {
      toastErrorNotify(`veriler çekilememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${path}/`, info);
      getBlog(path);
      toastSuccessNotify(`${path} başarıyla eklenmiştir.`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${path} eklenememiştir.`);
      console.log(error);
    }
  };

  const getUserBlogs = async (path = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/${path}?author=${user._id}`);
      const blogData = data.data;
      dispatch(getBlogSuccess({ blogData, path }));
    } catch (error) {
      toastErrorNotify(`Kullanıcı blogları çekilememiştir.`);
      dispatch(fetchFail());
      console.error(error);
    }
  };

  const getBlogComments = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/comments/?limit=10000`);
      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/blogs/${id}`);
      dispatch(getSingleBlogSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
    }
  };

  const addComment = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/comments/`, info);
      toastSuccessNotify("Comment added successfully.");
      await getBlogComments();
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("Failed to add comment.");
    }
  };

  const deleteBlog = async (path = "blogs", id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}`);
      toastSuccessNotify(`${path} başarıyla silinmiştir.`);
      getBlog(path);
    } catch (error) {
      toastErrorNotify(`${path} silinememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const putBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`/${path}/${info._id}`, info);
      getBlog(path);
      toastSuccessNotify(`${path} başarıyla guncellenmiştir.`);
    } catch (error) {
      toastErrorNotify(`${path} guncellenememiştir.`);
      dispatch(fetchFail());
      console.log(error);
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
    getVisitBlog,
    postLike,
    getSingleBlog,
  };
};
export default useBlogCalls;
