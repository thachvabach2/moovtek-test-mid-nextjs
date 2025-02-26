'use server'
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
    try {
        console.log('>>>>> check in authAction: ', email, password)
        const r = await signIn("credentials", {
            email: email,
            password: password,
            // callbackUrl: "/",
            redirect: false,
        })
        return r;
    } catch (error: unknown) {
        console.log('>>>> check error: ', error)
        if (error instanceof Error) {
            if (error.name === 'InvalidEmailPasswordError') {
                return {
                    error: error.message,
                    code: 400,
                }
            }
        }
        else {
            return {
                error: 'Internal Server Error',
                code: 500,
            }
        }
    }
}