import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../lib/session'

export type User = {
  isLoggedIn: boolean
  login: string
  avatarUrl: string,
  accessToken: string
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      login: '',
      avatarUrl: '',
      accessToken: ''
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)