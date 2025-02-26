import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InvalidEmailPasswordError } from "./utils/error"
import { IUser } from "./types/next-auth"
import { v4 as uuidv4 } from 'uuid';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                // console.log('>> check credentials: ', credentials)
                let res: IBackendRes<ILogin>;
                if (credentials.email === 'admin@gmail.com' && credentials.password === '123456') {
                    res = {
                        statusCode: 200,
                        message: 'Login success',
                        data: {
                            user: {
                                _id: uuidv4(),
                                email: credentials?.email,
                                name: "I'm Admin",
                                role: 'ADMIN',
                            },
                            access_token: uuidv4(),
                        }
                    }
                } else if (credentials.email === 'user@gmail.com' && credentials.password === '123456') {
                    res = {
                        statusCode: 200,
                        message: 'Login success',
                        data: {
                            user: {
                                _id: uuidv4(),
                                email: credentials?.email,
                                name: "I'm Operator",
                                role: 'OPERATOR',
                            },
                            access_token: uuidv4(),
                        }
                    }
                } else {
                    res = {
                        statusCode: 400,
                        message: 'Email/password không đúng',
                        error: 'Đã có lỗi xảy ra',
                    }
                }

                if (res.statusCode === 200) {
                    return {
                        _id: res.data?.user?._id,
                        name: res.data?.user?.name,
                        email: res.data?.user?.email,
                        role: res.data?.user?.role,
                        access_token: res.data?.access_token,
                    };
                } else if (res.statusCode === 400) {
                    throw new InvalidEmailPasswordError();
                } else {
                    throw new Error("Internal Server Error")
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.user = (user as IUser);
            }
            return token
        },
        session({ session, token }) {
            if (token.user) {
                (session.user as IUser) = token.user
            }
            return session
        },
        authorized: async ({ auth, request }) => {
            const url = new URL(request.url);
            if (url.pathname === '/') {
                return true;
            }

            if (url.pathname.startsWith("/driver") && auth?.user?.role !== "ADMIN") {
                return false;
            }

            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },
})