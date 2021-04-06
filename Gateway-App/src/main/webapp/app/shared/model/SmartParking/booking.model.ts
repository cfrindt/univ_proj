import { Moment } from 'moment';

export interface IBooking {
  id?: number;
  startTime?: Moment;
  endTime?: Moment;
  parkingTime?: String;
  reserved?: boolean;
  reservationTime?: Moment;
  cost?: number;
  bookingActive?: boolean;
  userId?: number;
  parkingSpotId?: number;
  carLicensePlate?: string;
  carId?: number;
}

export class Booking implements IBooking {
  constructor(
    public id?: number,
    public startTime?: Moment,
    public endTime?: Moment,
    public parkingTime?: String,
    public reserved?: boolean,
    public reservationTime?: Moment,
    public cost?: number,
    public bookingActive?: boolean,
    public userId?: number,
    public parkingSpotId?: number,
    public carLicensePlate?: string,
    public carId?: number
  ) {
    this.reserved = this.reserved || false;
    this.bookingActive = this.bookingActive || false;
  }
}
