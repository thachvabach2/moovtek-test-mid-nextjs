'use server'

import { auth } from "@/auth"
import { IRideBooking } from "@/types/ride.booking";
import { revalidateTag } from "next/cache";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const handleUpdateRideBookingAction = async (data: IRideBooking) => {
    const session = await auth();
    const res = await fetch(`${API_URL}/api/rides`, {
        method: 'PUT',
        headers: {
            Authentication: `Bearer ${session?.user?.access_token}`
        },
        body: JSON.stringify({
            _id: data?._id,
            customerName: data?.customerName,
            pickup: data?.pickup,
            dropoff: data?.dropoff,
            driverName: data?.driverName,
            status: data?.status,
        })
    })
    // console.log('>>>> check res update: ', res)
    if (res.ok) {
        revalidateTag('list-ride-booking');
        return res.json();
    } else {
        console.log("Failed to update ride");
    }
}

export const handleDeleteRideBookingAction = async (_id: string) => {
    const session = await auth();
    const res = await fetch(`${API_URL}/api/rides`, {
        method: 'DELETE',
        headers: {
            Authentication: `Bearer ${session?.user?.access_token}`
        },
        body: JSON.stringify({ _id })
    })
    if (res.ok) {
        revalidateTag('list-ride-booking');
        return res.json();
    } else {
        console.log('Failed Delete')
    }
}