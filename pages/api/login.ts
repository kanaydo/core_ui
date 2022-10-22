import type { User } from './user'
import { AxiosError } from "axios";
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../lib/session'
import { axiosInstance } from '../../lib/axios_instance';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  try {
    const authParams = { 'username': username, 'password': password }
    const authResult = await axiosInstance.post('http://localhost:3000/auth/login', authParams);
    const { user, access_token } = await authResult.data;
    const currentUser = { 
      isLoggedIn: true, 
      login: user.username, 
      avatarUrl: 'https://placeimg.com/640/480/people', 
      accessToken: access_token 
    } as User
    req.session.user = currentUser;
    await req.session.save()
    res.json({error: false, user: currentUser});
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.data.message) {
        console.log('===================>', error.response.data);
      }
    }
    res.status(200).json({ error: true, message: 'username or password wrong'});
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)