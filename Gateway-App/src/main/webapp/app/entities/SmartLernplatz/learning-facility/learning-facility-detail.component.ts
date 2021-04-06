import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';

@Component({
  selector: 'jhi-learning-facility-detail',
  templateUrl: './learning-facility-detail.component.html'
})
export class LearningFacilityDetailComponent implements OnInit {
  learningFacility: ILearningFacility | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningFacility }) => (this.learningFacility = learningFacility));
  }

  previousState(): void {
    window.history.back();
  }
}
