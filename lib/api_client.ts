import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getSessionUser } from '../requests/sessions';

const axiosClient = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SALESSOUP_API_PATH,
    timeout: 60000
  });

  instance.interceptors.request.use(async (request) => {
    // const coreApiToken = request.cookies.get('core_api_token');
    // const { data } = useQuery(['session_user'], getSessionUser, { refetchInterval: 120000 });
    // /const session = await getSession();
    // if (session) {
    //   request.headers = {
    //     Authorization: `Bearer ${session.accessToken}`
    //   }
    // }
    return request
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