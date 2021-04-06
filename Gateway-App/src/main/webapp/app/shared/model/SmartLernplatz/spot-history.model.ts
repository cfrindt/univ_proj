import { Moment } from 'moment';

export interface ISpotHistory {
  id?: number;
  learningSpotId?: number;
  bookingStartStamp?: Moment;
  bookingEndStamp?: Moment;
  pauseStartStamp?: Moment;
  pauseEndStamp?: Moment;
}

export class SpotHistory implements ISpotHistory {
  constructor(
    public id?: number,
    public learningSpotId?: number,
    public bookingStartStamp?: Moment,
    public bookingEndStamp?: Moment,
    public pauseStartStamp?: Moment,
    public pauseEndStamp?: Moment
  ) {}
}
