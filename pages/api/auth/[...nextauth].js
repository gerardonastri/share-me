import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from "../../../util/mongo";
import User from '../../../models/User'

export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ],
    jwt: {
      encryption: true
    },
    secret: "secret token",
    pages: {
      singIn: "/login"
    },
    callbacks: {
        async signIn({profile, account}) {
          await dbConnect();
          const user = await User.find({username: profile.name})
          if(user === null || user.length === 0){
            await User.create({
              username: profile.name,
              email: profile.email,
              img: profile.image
            });
          }
          return true
        },
        redirect: async (url, _baseUrl)=>{
          if (url === '/user') {
            return Promise.resolve('/')
          }
          return  Promise.resolve('/')
        }
    }
  });