import { IBooking } from 'app/shared/model/SmartLernplatz/booking.model';

export interface ILearningSpot {
  id?: number;
  occupied?: boolean;
  socket?: boolean;
  silence?: boolean;
  learningAreaId?: number;
  bookings?: IBooking[];
}

export class LearningSpot implements ILearningSpot {
  constructor(
    public id?: number,
    public occupied?: boolean,
    public socket?: boolean,
    public silence?: boolean,
    public learningAreaId?: number,
    public bookings?: IBooking[]
  ) {
    this.occupied = this.occupied || false;
    this.socket = this.socket || false;
    this.silence = this.silence || false;
  }
}
