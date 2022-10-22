import { AxiosError } from 'axios';
import { axiosInstance } from "../lib/axios_instance";

export const submitLogin = async (params: any) => {
  try{
    const response = await axiosInstance.post("/api/login", params);
    const { error, user, message } = response.data;
    if (error) {
      throw new Error(message);
    } else {
      return user;
    }
  } catch(e) {
    let errorMessage = 'something wrong, please try again!';
    if (e instanceof AxiosError && e.response) {
      if (e.response.data.message) {
        errorMessage = e.response.data.message;
      }
    }
    throw new Error(errorMessage);
  }
};

export const getSessionUser = async() => {
  const response = await axiosInstance.get('/api/user');
  return response.data;
}

export const signOutUser = async(cmd: any) => {
  const response = await axiosInstance.post('/api/logout');
  return response.data;
}