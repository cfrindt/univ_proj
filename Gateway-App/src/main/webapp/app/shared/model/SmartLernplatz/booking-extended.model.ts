import { Moment } from 'moment';
import { ILearningSpotExtended } from 'app/shared/model/SmartLernplatz/learning-spot-extended.model';

export interface IBookingExtended {
  id: number;
  userId?: number;
  bookingEndStamp?: Moment;
  bookingStartStamp?: Moment;
  isPaused: boolean;
  learningSpot: ILearningSpotExtended;
}

export class BookingExtended implements IBookingExtended {
  constructor(
    public learningSpot: ILearningSpotExtended,
    public id: number,
    public isPaused: boolean,
    public bookingEndStamp?: Moment,
    public bookingStartStamp?: Moment
  ) {
    this.isPaused = this.isPaused || false;
  }
}
