import { IRideBooking } from '@/types/ride.booking';
import { NextResponse } from 'next/server';

const mockRides: IRideBooking[] = [
    { _id: '1', customerName: "John Doe", pickup: "123 Main St", dropoff: "456 Elm St", driverName: "Michael Johnson", status: "Pending" },
    { _id: '2', customerName: "Jane Smith", pickup: "789 Oak St", dropoff: "321 Pine St", driverName: "Sarah Lee", status: "In Progress" },
    { _id: '3', customerName: "Emily Davis", pickup: "654 Maple St", dropoff: "987 Cedar St", driverName: "David Brown", status: "Completed" },
    { _id: '4', customerName: "James Wilson", pickup: "111 Birch St", dropoff: "222 Walnut St", driverName: "Emma White", status: "Canceled" },
    { _id: '5', customerName: "Alice Brown", pickup: "555 Oak St", dropoff: "777 Pine St", driverName: "Chris Evans", status: "Pending" },
    { _id: '6', customerName: "Bob White", pickup: "888 Elm St", dropoff: "999 Cedar St", driverName: "Natalie Portman", status: "Completed" },
    { _id: '7', customerName: "Charlie Black", pickup: "111 Pine St", dropoff: "222 Maple St", driverName: "Robert Downey", status: "In Progress" },
    { _id: '8', customerName: "Daisy Green", pickup: "333 Birch St", dropoff: "444 Oak St", driverName: "Scarlett Johansson", status: "Canceled" },
    { _id: '9', customerName: "Ethan Blue", pickup: "555 Walnut St", dropoff: "666 Elm St", driverName: "Tom Holland", status: "Pending" },
    { _id: '10', customerName: "Fiona Red", pickup: "777 Cedar St", dropoff: "888 Birch St", driverName: "Zendaya", status: "Completed" },
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const current = parseInt(searchParams.get("current") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "3");

    // calc pagination
    const totalItems = mockRides.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const ridesPag = mockRides.slice(startIndex, endIndex);

    return NextResponse.json({
        meta: {
            current: current,
            pageSize: pageSize,
            pages: totalPages,
            total: totalItems,
        },
        data: ridesPag,
    })
}

export async function PUT(req: Request) {
    const { _id, customerName, pickup, dropoff, driverName, status } = await req.json();

    const rideIndex = mockRides.findIndex((ride) => ride._id === _id);
    if (rideIndex === -1) {
        return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    mockRides[rideIndex] = { _id, customerName, pickup, dropoff, driverName, status };

    return NextResponse.json({
        message: "Ride updated successfully",
        data: mockRides[rideIndex]
    });
}

export async function DELETE(req: Request) {
    const { _id } = await req.json();

    const rideIndex = mockRides.findIndex((ride) => ride._id === _id);

    if (rideIndex === -1) {
        return NextResponse.json({
            status: 404,
            error: "Ride not found",
        });
    }

    mockRides.splice(rideIndex, 1);

    return NextResponse.json({
        message: `Ride with ID ${_id} deleted successfully`
    });
}