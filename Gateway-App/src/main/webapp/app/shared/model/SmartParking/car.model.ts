import { IBooking } from 'app/shared/model/SmartParking/booking.model';

export interface ICar {
  id?: number;
  licensePlate?: string;
  manufacturer?: string;
  color?: string;
  owner?: number;
  bookings?: IBooking[];
}

export class Car implements ICar {
  constructor(
    public id?: number,
    public licensePlate?: string,
    public manufacturer?: string,
    public color?: string,
    public owner?: number,
    public bookings?: IBooking[]
  ) {}
}
