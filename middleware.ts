import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    //console.log(req.nextauth.token?.accessToken)
  },
  {
    pages: {
      signIn: '/login'
    }
  }
)


export const config = {
  matcher: [
    '/((?!api|static|favicon.ico|_next).*)',
  ]
}