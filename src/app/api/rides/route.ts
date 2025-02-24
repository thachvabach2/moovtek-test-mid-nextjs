import { IRideBooking } from '@/types/ride.booking';
import { NextResponse } from 'next/server';

const mockRides: IRideBooking[] = [
    { _id: '1', customerName: "John Doe", pickup: "123 Main St", dropoff: "456 Elm St", driverName: "Michael Johnson", status: "Pending" },
    { _id: '2', customerName: "Jane Smith", pickup: "789 Oak St", dropoff: "321 Pine St", driverName: "Sarah Lee", status: "In Progress" },
    { _id: '3', customerName: "Emily Davis", pickup: "654 Maple St", dropoff: "987 Cedar St", driverName: "David Brown", status: "Completed" },
    { _id: '4', customerName: "James Wilson", pickup: "111 Birch St", dropoff: "222 Walnut St", driverName: "Emma White", status: "Canceled" },
];

// Handle GET request
export async function GET() {
    return NextResponse.json(mockRides);
}