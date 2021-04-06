import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

export interface ILearningArea {
  id?: number;
  name?: string;
  learningFacilityId?: number;
  learningSpots?: ILearningSpot[];
}

export class LearningArea implements ILearningArea {
  constructor(public id?: number, public name?: string, public learningFacilityId?: number, public learningSpots?: ILearningSpot[]) {}
}
