import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';

@Component({
  selector: 'jhi-spot-history-detail',
  templateUrl: './spot-history-detail.component.html'
})
export class SpotHistoryDetailComponent implements OnInit {
  spotHistory: ISpotHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spotHistory }) => (this.spotHistory = spotHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
