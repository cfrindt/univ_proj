import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';

export interface ILearningFacility {
  id?: number;
  name?: string;
  learningAreas?: ILearningArea[];
}

export class LearningFacility implements ILearningFacility {
  constructor(public id?: number, public name?: string, public learningAreas?: ILearningArea[]) {}
}
