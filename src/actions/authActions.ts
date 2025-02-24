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
    } catch (error) {
        if ((error as any).name === 'InvalidEmailPasswordError') {
            return {
                error: (error as any).type,
                code: 400,
            }
        } else {
            return {
                error: 'Internal Server Error',
                code: 500,
            }
        }
        // if (error.cause.err instanceof InvalidLoginError) {
        //     return {"error": "Incorrect username or password"}
        // } else {
        //     throw new Error("Failed to authenticate")
        // }
    }
}