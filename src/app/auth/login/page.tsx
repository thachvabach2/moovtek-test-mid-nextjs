import { auth } from "@/auth";
import Login from "@/components/auth/login";
import { redirect } from 'next/navigation'

const LoginPage = async () => {
    const session = await auth();
    if (session) redirect(`/dashboard`);

    return (
        <>
            <Login />
        </>
    )
}

export default LoginPage;