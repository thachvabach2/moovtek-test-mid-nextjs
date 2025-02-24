import HomePage from "@/components/layout/homepage";
import { Button } from "antd";
import { auth, signIn } from "@/auth"

export default async function Home() {
    const session = await auth()
    console.log('>>>> check session: ', session)

    return (
        <>
            <HomePage />
        </>
    );
}
