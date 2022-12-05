import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      return {
        ...token,
        user,
        // accessToken: user.data.token,
        // refreshToken: user.data.refreshToken,
      };
    },

    async session({ session, token }) {
      // session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        //Connect to DB
        const MONGODB_CONNECTION_STRING = `mongodb+srv://${
          process.env.MONGODB_USER
        }:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${
          process.env.MONGODB_CLUSTER
        }.jgqu5.mongodb.net/${
          process.env.MONGODB_DB
        }?retryWrites=true&w=majority`;
        const client = await MongoClient.connect(MONGODB_CONNECTION_STRING);
        //Get all the users
        const users = await client.db('sicard').collection('users');
        //Find user with the email
        const result = await users.findOne({
          email: credentials.email,
        });
        //Not found - send error res
        if (!result) {
          client.close();
          throw new Error('No user found with the email');
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error('Password doesnt match');
        }
        //Else send success response
        client.close();
        return {
          email: result.email,
          name: result.name,
          image: result.imageUrl,
          id: result._id,
        };
      },
    }),
  ],
});
