export interface Booking{
    name: string;
    email: string;
    bookingDate: string;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    numRooms: number;
    totalAmount: number;
    paymentStatus: string;
    hotelId: number;
    hotelTitle: string;
    hotelCity: string;
    hotelLocation: string;
}