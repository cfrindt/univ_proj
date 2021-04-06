import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';

@Component({
  selector: 'jhi-occupancy-history-detail',
  templateUrl: './occupancy-history-detail.component.html'
})
export class OccupancyHistoryDetailComponent implements OnInit {
  occupancyHistory: IOccupancyHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ occupancyHistory }) => (this.occupancyHistory = occupancyHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
