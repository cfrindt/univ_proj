import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';

@Component({
  selector: 'jhi-learning-area-detail',
  templateUrl: './learning-area-detail.component.html'
})
export class LearningAreaDetailComponent implements OnInit {
  learningArea: ILearningArea | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningArea }) => (this.learningArea = learningArea));
  }

  previousState(): void {
    window.history.back();
  }
}
