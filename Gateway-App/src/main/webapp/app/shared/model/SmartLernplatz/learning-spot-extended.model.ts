import { IBooking } from 'app/shared/model/SmartLernplatz/booking.model';
import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { ILearningAreaExtended } from 'app/shared/model/SmartLernplatz/learning-area-extended.model';

export interface ILearningSpotExtended {
  id?: number;
  occupied?: boolean;
  socket?: boolean;
  silence?: boolean;
  learningArea: ILearningAreaExtended;
}

export class LearningSpotExtended implements ILearningSpotExtended {
  constructor(
    public learningArea: ILearningAreaExtended,
    public id?: number,
    public occupied?: boolean,
    public socket?: boolean,
    public silence?: boolean
  ) {
    this.occupied = this.occupied || false;
    this.socket = this.socket || false;
    this.silence = this.silence || false;
  }
}
