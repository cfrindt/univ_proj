import { IBooking } from 'app/shared/model/SmartParking/booking.model';

export interface IParkingSpot {
  id?: number;
  spotType?: string;
  occupied?: boolean;
  parkingAreaId?: number;
  bookings?: IBooking[];
}

export class ParkingSpot implements IParkingSpot {
  constructor(
    public id?: number,
    public spotType?: string,
    public occupied?: boolean,
    public parkingAreaId?: number,
    public bookings?: IBooking[]
  ) {
    this.occupied = this.occupied || false;
  }
}
