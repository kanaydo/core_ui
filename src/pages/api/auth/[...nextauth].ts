
import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_CORE_API_PATH}/administrators/sign_in`, credentials);
        
        const administrator = response.data.administrator;
        const accessToken = response.headers['access-token'];

        if (administrator != null && accessToken != null) {
          return { 
            id: administrator.id, 
            name: administrator.username, 
            email: administrator.username, 
            accessToken: accessToken
          };
        }
        return null
      }
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
})