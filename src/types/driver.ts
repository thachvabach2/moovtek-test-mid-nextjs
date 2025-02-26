export interface IDriver {
    _id: string,
    fullName: string,
    contactInfo: {
        phone: string,
        email: string,
    },
    vehicle: {
        _id: string,
        company: string,
        model: string,
        year: number,
        plateNumber: string,
    },
    completedRides: number,
    rating: number,
    reviews: IReview[],
    createdAt: string,
    updatedAt: string,
}

interface IReview {
    _id: string,
    reviewer: string,
    comment: string,
    rating: number,
    createdAt: string,
}