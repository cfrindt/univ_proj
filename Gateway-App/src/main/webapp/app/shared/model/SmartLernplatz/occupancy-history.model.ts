import { Moment } from 'moment';

export interface IOccupancyHistory {
  id?: number;
  timeStamp?: Moment;
  occCounter?: number;
  leanringSpotId?: number;
  localDateStamp?: Moment;
}

export class OccupancyHistory implements IOccupancyHistory {
  constructor(
    public id?: number,
    public timeStamp?: Moment,
    public occCounter?: number,
    public leanringSpotId?: number,
    public localDateStamp?: Moment
  ) {}
}
