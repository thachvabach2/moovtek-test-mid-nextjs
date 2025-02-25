export interface IRideBooking {
    _id: string;
    customerName: string;
    pickup: string;
    dropoff: string;
    driverName: string;
    status: StatusType;
}

export type StatusType = 'Pending' | 'In Progress' | 'Completed' | 'Canceled'