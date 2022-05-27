import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from "../../../util/mongo";
import User from '../../../models/User'

export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "904109985886-fln1ub2igu3uqjk4tgmrerk1lpjdcjba.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      })
    ],
    jwt: {
      encryption: true
    },
    secret: "secret token",
    callbacks: {
        async signIn({profile, account}) {
          await dbConnect();
          const user = await User.find({username: profile.name})
          if(!user){
            await User.create({
              username: profile.name,
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