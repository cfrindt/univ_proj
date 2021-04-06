import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

@Component({
  selector: 'jhi-learning-spot-detail',
  templateUrl: './learning-spot-detail.component.html'
})
export class LearningSpotDetailComponent implements OnInit {
  learningSpot: ILearningSpot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningSpot }) => (this.learningSpot = learningSpot));
  }

  previousState(): void {
    window.history.back();
  }
}
