import { IDriver } from "@/types/driver";
import { NextResponse } from "next/server";

const mockDrivers: IDriver[] = [
    {
        _id: "1",
        fullName: "Michael Johnson",
        contactInfo: {
            phone: "+1 234 567 890",
            email: "michael.johnson@example.com",
        },
        vehicle: {
            _id: "1",
            company: "Toyota",
            model: "Camry",
            year: 2020,
            plateNumber: "ABC-1234",
        },
        completedRides: 150,
        rating: 4.8,
        reviews: [
            { _id: "1", reviewer: "John Doe", comment: "Great ride, very professional!", rating: 5, createdAt: "26 Feb, 2025" },
            { _id: "2", reviewer: "Jane Smith", comment: "Smooth driving, highly recommend.", rating: 4.7, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "2",
        fullName: "Sarah Lee",
        contactInfo: {
            phone: "+1 345 678 901",
            email: "sarah.lee@example.com",
        },
        vehicle: {
            _id: "2",
            company: "Honda",
            model: "Civic",
            year: 2019,
            plateNumber: "XYZ-5678",
        },
        completedRides: 200,
        rating: 4.9,
        reviews: [
            { _id: "3", reviewer: "Alice Brown", comment: "Very friendly and on time!", rating: 5, createdAt: "26 Feb, 2025" },
            { _id: "4", reviewer: "Tom White", comment: "Good experience, clean car.", rating: 4.8, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "3",
        fullName: "David Brown",
        contactInfo: {
            phone: "+1 456 789 012",
            email: "david.brown@example.com",
        },
        vehicle: {
            _id: "3",
            company: "Ford",
            model: "Focus",
            year: 2021,
            plateNumber: "LMN-3456",
        },
        completedRides: 120,
        rating: 4.6,
        reviews: [
            { _id: "5", reviewer: "Ethan Green", comment: "Good driver, but could be more punctual.", rating: 4.3, createdAt: "26 Feb, 2025" },
            { _id: "6", reviewer: "Samantha Black", comment: "Nice conversation and safe driving!", rating: 4.9, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "4",
        fullName: "Emma White",
        contactInfo: {
            phone: "+1 567 890 123",
            email: "emma.white@example.com",
        },
        vehicle: {
            _id: "4",
            company: "Tesla",
            model: "Model 3",
            year: 2022,
            plateNumber: "TES-9999",
        },
        completedRides: 250,
        rating: 4.9,
        reviews: [
            { _id: "7", reviewer: "Chris Blue", comment: "Amazing driver, super smooth ride!", rating: 5, createdAt: "26 Feb, 2025" },
            { _id: "8", reviewer: "Nina Red", comment: "Super friendly and professional.", rating: 4.9, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "5",
        fullName: "James Wilson",
        contactInfo: {
            phone: "+1 678 901 234",
            email: "james.wilson@example.com",
        },
        vehicle: {
            _id: "5",
            company: "Chevrolet",
            model: "Malibu",
            year: 2018,
            plateNumber: "CHE-1111",
        },
        completedRides: 180,
        rating: 4.7,
        reviews: [
            { _id: "9", reviewer: "Olivia Green", comment: "Very polite and safe driver.", rating: 4.7, createdAt: "26 Feb, 2025" },
            { _id: "10", reviewer: "Noah Brown", comment: "Always on time, great experience!", rating: 5, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "6",
        fullName: "Olivia Martin",
        contactInfo: {
            phone: "+1 789 012 345",
            email: "olivia.martin@example.com",
        },
        vehicle: {
            _id: "6",
            company: "Hyundai",
            model: "Elantra",
            year: 2017,
            plateNumber: "HYU-2222",
        },
        completedRides: 140,
        rating: 4.6,
        reviews: [
            { _id: "11", reviewer: "Lucas Gray", comment: "Comfortable ride, very nice driver!", rating: 4.6, createdAt: "26 Feb, 2025" },
            { _id: "12", reviewer: "Mia Blue", comment: "Would definitely ride again!", rating: 4.8, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "7",
        fullName: "Ethan Taylor",
        contactInfo: {
            phone: "+1 890 123 456",
            email: "ethan.taylor@example.com",
        },
        vehicle: {
            _id: "7",
            company: "Nissan",
            model: "Altima",
            year: 2020,
            plateNumber: "NIS-3333",
        },
        completedRides: 160,
        rating: 4.8,
        reviews: [
            { _id: "13", reviewer: "Sophia White", comment: "Very professional and punctual!", rating: 5, createdAt: "26 Feb, 2025" },
            { _id: "14", reviewer: "Jackson Green", comment: "Great service, friendly driver.", rating: 4.7, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "8",
        fullName: "Sophia Anderson",
        contactInfo: {
            phone: "+1 901 234 567",
            email: "sophia.anderson@example.com",
        },
        vehicle: {
            _id: "8",
            company: "Mazda",
            model: "CX-5",
            year: 2021,
            plateNumber: "MAZ-4444",
        },
        completedRides: 130,
        rating: 4.5,
        reviews: [
            { _id: "15", reviewer: "Aiden Black", comment: "Safe driving, highly recommended!", rating: 4.5, createdAt: "26 Feb, 2025" },
            { _id: "16", reviewer: "Ella Red", comment: "Good experience, would book again!", rating: 4.6, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
    {
        _id: "9",
        fullName: "Alexander Harris",
        contactInfo: {
            phone: "+1 012 345 678",
            email: "alexander.harris@example.com",
        },
        vehicle: {
            _id: "9",
            company: "Volkswagen",
            model: "Passat",
            year: 2019,
            plateNumber: "VOL-5555",
        },
        completedRides: 175,
        rating: 4.7,
        reviews: [
            { _id: "17", reviewer: "Eleanor Gray", comment: "Very smooth ride, highly recommend!", rating: 4.8, createdAt: "26 Feb, 2025" },
            { _id: "18", reviewer: "Henry Blue", comment: "Great conversation, very polite!", rating: 4.7, createdAt: "26 Feb, 2025" },
        ],
        createdAt: "26 Feb, 2025",
        updatedAt: "26 Feb, 2025",
    },
]


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const current = parseInt(searchParams.get("current") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "3");

    let searchedDrivers = mockDrivers;

    // calc pagination
    const totalItems = searchedDrivers.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const ridesPag = searchedDrivers.slice(startIndex, endIndex);

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
