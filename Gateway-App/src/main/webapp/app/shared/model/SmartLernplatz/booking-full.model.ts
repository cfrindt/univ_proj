import { Moment } from 'moment';

export interface IBookingFull {
  id?: number;
  userId?: number;
  bookingStartStamp?: Moment;
  bookingEndStamp?: Moment;
  isPaused?: boolean;
  pauseStartStamp?: Moment;
  pauseEndStamp?: Moment;
  learningSpotId?: number;
}

export class Booking implements IBookingFull {
  constructor(
    public id?: number,
    public userId?: number,
    public bookingStartStamp?: Moment,
    public bookingEndStamp?: Moment,
    public isPaused?: boolean,
    public pauseStartStamp?: Moment,
    public pauseEndStamp?: Moment,
    public learningSpotId?: number
  ) {
    this.isPaused = this.isPaused || false;
  }
}
