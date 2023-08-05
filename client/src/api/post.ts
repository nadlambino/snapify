import { AxiosError, AxiosResponse } from 'axios';
import { cookie } from '../utils/cookie';

export const createPost = async (post: FormData) => {
  return await window.axios
    .post(`${window.apiUrl}/post`, post, {
      headers: {
        Authorization: `Bearer ${cookie('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const deletePost = async (postId: string) => {
  return await window.axios
    .delete(`${window.apiUrl}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${cookie('token')}`,
      },
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const getPosts = async (lastPostId?: string) => {
  const queryString = lastPostId ? `q=${lastPostId}` : '';
  return await window.axios
    .get(`${window.apiUrl}/post/feed?${queryString}`, {
      headers: {
        Authorization: `Bearer ${cookie('token')}`,
      },
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const commentPost = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  return await window.axios
    .post(
      `${window.apiUrl}/post/${postId}/comment`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${cookie('token')}`,
        },
      }
    )
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const reactPost = async ({ postId }: { postId: string }) => {
  return await window.axios
    .post(
      `${window.apiUrl}/post/${postId}/react`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookie('token')}`,
        },
      }
    )
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
};
