import { Moment } from 'moment';

export interface IUserHistory {
  id?: number;
  userId?: number;
  pauseStartStamp?: Moment;
  pauseEndStamp?: Moment;
  bookingStartStamp?: Moment;
  bookingEndStamp?: Moment;
}

export class UserHistory implements IUserHistory {
  constructor(
    public id?: number,
    public userId?: number,
    public pauseStartStamp?: Moment,
    public pauseEndStamp?: Moment,
    public bookingStartStamp?: Moment,
    public bookingEndStamp?: Moment
  ) {}
}
