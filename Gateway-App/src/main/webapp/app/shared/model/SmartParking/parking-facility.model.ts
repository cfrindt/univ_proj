import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';

export interface IParkingFacility {
  id?: number;
  name?: string;
  capacity?: number;
  fullyOccupied?: boolean;
  parkingAreas?: IParkingArea[];
}

export class ParkingFacility implements IParkingFacility {
  constructor(
    public id?: number,
    public name?: string,
    public capacity?: number,
    public fullyOccupied?: boolean,
    public parkingAreas?: IParkingArea[]
  ) {
    this.fullyOccupied = this.fullyOccupied || false;
  }
}
