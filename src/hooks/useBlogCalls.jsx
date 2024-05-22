import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getBlogSuccess } from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useState } from "react";

const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  // const [commentsCount, setCommentsCount] = useState(0);

  const getBlog = async (path = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/${path}`);
      const stockData = data.data;
      dispatch(getBlogSuccess({ stockData, path }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${path} verileri çekilememiştir`);

      console.log(error);
    }
  };

  const postBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${path}/`, info);
      getBlog(path);
      toastSuccessNotify(`${path} başarıyla eklenmiştir`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${path} eklenirken bir hata oluştu`);
      console.log(error);
    }
  };

  const deleteBlog = async (path = "blogs", id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}`);
      toastSuccessNotify(`${path} başarıyla silinmiştir`);
      getBlog(path);
    } catch (error) {
      toastErrorNotify(`${path} silinememiştir`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const putBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`/${path}/${info._id}`, info);
      getBlog(path);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${path} guncellenememiştir.`);
      console.log(error);
    }
  };

  const getCommentsCount = async (blogId) => {
    try {
      const response = await axiosToken.get(
        `/api/comments/count?blogId=${blogId}`
      );
      return response.data.count;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  return { getBlog, deleteBlog, postBlog, putBlog, getCommentsCount };
};

export default useBlogCalls;
