import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILearningSpot, LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { LearningSpotService } from './learning-spot.service';
import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { LearningAreaService } from 'app/entities/SmartLernplatz/learning-area/learning-area.service';

@Component({
  selector: 'jhi-learning-spot-update',
  templateUrl: './learning-spot-update.component.html'
})
export class LearningSpotUpdateComponent implements OnInit {
  isSaving = false;
  learningareas: ILearningArea[] = [];

  editForm = this.fb.group({
    id: [],
    occupied: [null, [Validators.required]],
    socket: [null, [Validators.required]],
    silence: [null, [Validators.required]],
    learningAreaId: [null, Validators.required]
  });

  constructor(
    protected learningSpotService: LearningSpotService,
    protected learningAreaService: LearningAreaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningSpot }) => {
      this.updateForm(learningSpot);

      this.learningAreaService.query().subscribe((res: HttpResponse<ILearningArea[]>) => (this.learningareas = res.body || []));
    });
  }

  updateForm(learningSpot: ILearningSpot): void {
    this.editForm.patchValue({
      id: learningSpot.id,
      occupied: learningSpot.occupied,
      socket: learningSpot.socket,
      silence: learningSpot.silence,
      learningAreaId: learningSpot.learningAreaId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const learningSpot = this.createFromForm();
    if (learningSpot.id !== undefined) {
      this.subscribeToSaveResponse(this.learningSpotService.update(learningSpot));
    } else {
      this.subscribeToSaveResponse(this.learningSpotService.create(learningSpot));
    }
  }

  private createFromForm(): ILearningSpot {
    return {
      ...new LearningSpot(),
      id: this.editForm.get(['id'])!.value,
      occupied: this.editForm.get(['occupied'])!.value,
      socket: this.editForm.get(['socket'])!.value,
      silence: this.editForm.get(['silence'])!.value,
      learningAreaId: this.editForm.get(['learningAreaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILearningSpot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ILearningArea): any {
    return item.id;
  }
}
