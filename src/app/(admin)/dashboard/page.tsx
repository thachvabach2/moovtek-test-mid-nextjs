import { auth } from "@/auth";
import RideBookingTable from "@/components/admin/ride.booking.table";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface IProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const DashboardPage = async ({ searchParams }: IProps) => {
    const session = await auth();

    const params = await searchParams;
    const current = params?.current ?? 1
    const pageSize = params?.pageSize ?? 3

    const customerName = params?.customerName ?? ''
    const status = params?.status ?? ''

    const getRideBookings = async () => {
        const res =
            await fetch(`${API_URL}/api/rides?current=${current}&pageSize=${pageSize}
                        &customerName=${customerName}&status=${status}`, {
                method: 'GET',
                headers: {
                    Authentication: `Bearer ${session?.user?.access_token}`
                },
                cache: 'force-cache',
                next: {
                    tags: ['list-ride-booking']
                }
            });
        if (!res.ok) {
            throw new Error("Failed to fetch rides");
        }
        return res.json();
    }

    const { data: rides, meta } = await getRideBookings();

    return (
        <div>
            <RideBookingTable
                rideBookings={rides}
                meta={meta}
            />
        </div>
    )
}

export default DashboardPage;