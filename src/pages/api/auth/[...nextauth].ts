
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
      async authorize(credentials, req) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_CORE_API_PATH}/auth`, credentials);
        
        const { administrator, access_token } = response.data;
        if (administrator != null) {
          return { 
            id: administrator.id, 
            name: administrator.username, 
            email: administrator.username, 
            accessToken: access_token 
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
    async session({ session, user, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
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