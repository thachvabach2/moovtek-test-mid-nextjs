import { auth } from "@/auth";
import RideBookingTable from "@/components/admin/ride.booking.table";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const DashboardPage = async ({ searchParams }: IProps) => {
    const params = await searchParams;
    const current = params?.current ?? 1
    const pageSize = params?.pageSize ?? 3
    const session = await auth();

    const getRideBookings = async () => {
        const res = await fetch(`${API_URL}/api/rides?current=${current}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                Authentication: `Bearer ${session?.user?.access_token}`
            },
            next: {
                tags: ['list-ride-booking']
            }
        });

        // console.log('>>>>> check res ride booking: ', res);
        if (!res.ok) {
            throw new Error("Failed to fetch rides");
        }
        return res.json();
    }

    const { data: rides, meta } = await getRideBookings();
    // console.log('>>>> check length ride: ', rides)

    // await fetch(`${API_URL}/api/rides`, {
    //     method: 'PUT',
    //     headers: {
    //         Authentication: `Bearer ${session?.user?.access_token}`
    //     },
    //     body: JSON.stringify({
    //         _id: '123',
    //         customerName: 'Bach Dao',
    //         pickup: 'hcm',
    //         dropoff: 'ha loi',
    //         driverName: 'Thach',
    //         status: 'Pending',
    //     })
    // })

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