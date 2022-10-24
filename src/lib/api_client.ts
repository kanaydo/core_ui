import axios from 'axios'
import { getSession } from 'next-auth/react';

const axiosClient = () => {
  const instance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_SALESSOUP_API_PATH,
    timeout: 60000
  });

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers = {
        Authorization: `Bearer ${session.user.accessToken}`
      }
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(`error`, error)
    }
  );
  return instance;
}

export default axiosClient