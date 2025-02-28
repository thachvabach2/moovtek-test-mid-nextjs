import { auth } from "@/auth";
import DriverTable from "@/components/admin/driver/driver.table";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface IProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const DriverManagementPage = async ({ searchParams }: IProps) => {
    const session = await auth();

    const params = await searchParams;
    const current = params?.current ?? 1
    const pageSize = params?.pageSize ?? 3

    const getDrivers = async () => {
        const res =
            await fetch(`${API_URL}/api/drivers?current=${current}&pageSize=${pageSize}`, {
                method: 'GET',
                headers: {
                    Authentication: `Bearer ${session?.access_token}`
                },
                cache: 'force-cache',
                next: {
                    tags: ['list-driver']
                }
            });
        if (!res.ok) {
            throw new Error("Failed to fetch Drivers");
        }
        return res.json();
    }

    const { data: drivers, meta } = await getDrivers();

    return (
        <>
            <DriverTable
                listDriver={drivers}
                meta={meta}
            />
        </>
    )
}

export default DriverManagementPage;