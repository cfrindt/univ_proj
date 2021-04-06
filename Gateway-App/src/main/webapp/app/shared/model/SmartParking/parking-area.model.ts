import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';

export interface IParkingArea {
  id?: number;
  name?: string;
  capacity?: number;
  completlyOccupied?: boolean;
  parkingFacilityId?: number;
  parkingSpots?: IParkingSpot[];
}

export class ParkingArea implements IParkingArea {
  constructor(
    public id?: number,
    public name?: string,
    public capacity?: number,
    public completlyOccupied?: boolean,
    public parkingFacilityId?: number,
    public parkingSpots?: IParkingSpot[]
  ) {
    this.completlyOccupied = this.completlyOccupied || false;
  }
}
