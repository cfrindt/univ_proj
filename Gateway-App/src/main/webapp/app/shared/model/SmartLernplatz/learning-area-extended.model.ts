import { ILearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';

export interface ILearningAreaExtended {
  id?: number;
  name?: string;
  learningFacility: ILearningFacility;
}

export class LearningAreaExtended implements ILearningAreaExtended {
  constructor(public learningFacility: ILearningFacility, public id?: number, public name?: string) {}
}
