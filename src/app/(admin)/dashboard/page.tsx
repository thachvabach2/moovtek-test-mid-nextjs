import RideBookingTable from "@/components/admin/ride.booking.table";
import { IRideBooking } from "@/types/ride.booking";
import { Button } from "antd";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getRideBookings = async () => {
    const res = await fetch(`${API_URL}/api/rides`);
    if (!res.ok) {
        throw new Error("Failed to fetch rides");
    }
    return res.json();
}

const DashboardPage: React.FC = async () => {
    const rides: IRideBooking[] = await getRideBookings();
    console.log('>>>> check length ride: ', rides)

    // hard code
    const current: number = 1;
    const pageSize: number = 10;
    const pages: number = 3;
    const total: number = 25;

    const meta = { current, pageSize, pages, total };

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