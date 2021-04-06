import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';

@Component({
  selector: 'jhi-parking-area-detail',
  templateUrl: './parking-area-detail.component.html'
})
export class ParkingAreaDetailComponent implements OnInit {
  parkingArea: IParkingArea | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parkingArea }) => (this.parkingArea = parkingArea));
  }

  previousState(): void {
    window.history.back();
  }
}
