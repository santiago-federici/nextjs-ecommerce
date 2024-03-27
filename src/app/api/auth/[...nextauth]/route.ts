import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@models/user'
import { connectDB } from '@utils/DBconnection'

interface SessionUser {
  id: string
  name: string
  email: string
  image: string
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email })

      if (sessionUser){
        const updatedUser: SessionUser = {
          id: sessionUser._id.toString(),
          name: sessionUser.name,
          email: sessionUser.email,
          image: sessionUser.image
        }
        session.user = updatedUser
      }

      return session
    },
    async signIn ({ profile  }: any) {
      try {
        await connectDB()

        const userExists = await User.findOne({ email: profile && profile.email })

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.picture
          })
        }

        return true
      } catch (err) {
        console.error(err)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
