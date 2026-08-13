export const dynamic = 'force-dynamic';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase();

        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (!user.password) {
          throw new Error(
            'This account does not have password authentication enabled'
          );
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt' as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: any;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id ?? token.sub;
      }

      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };