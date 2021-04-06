import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';

@Component({
  selector: 'jhi-parking-facility-detail',
  templateUrl: './parking-facility-detail.component.html'
})
export class ParkingFacilityDetailComponent implements OnInit {
  parkingFacility: IParkingFacility | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parkingFacility }) => (this.parkingFacility = parkingFacility));
  }

  previousState(): void {
    window.history.back();
  }
}
