import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILearningArea, LearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { LearningAreaService } from './learning-area.service';
import { ILearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';
import { LearningFacilityService } from 'app/entities/SmartLernplatz/learning-facility/learning-facility.service';

@Component({
  selector: 'jhi-learning-area-update',
  templateUrl: './learning-area-update.component.html'
})
export class LearningAreaUpdateComponent implements OnInit {
  isSaving = false;
  learningfacilities: ILearningFacility[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    learningFacilityId: [null, Validators.required]
  });

  constructor(
    protected learningAreaService: LearningAreaService,
    protected learningFacilityService: LearningFacilityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningArea }) => {
      this.updateForm(learningArea);

      this.learningFacilityService
        .query()
        .subscribe((res: HttpResponse<ILearningFacility[]>) => (this.learningfacilities = res.body || []));
    });
  }

  updateForm(learningArea: ILearningArea): void {
    this.editForm.patchValue({
      id: learningArea.id,
      name: learningArea.name,
      learningFacilityId: learningArea.learningFacilityId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const learningArea = this.createFromForm();
    if (learningArea.id !== undefined) {
      this.subscribeToSaveResponse(this.learningAreaService.update(learningArea));
    } else {
      this.subscribeToSaveResponse(this.learningAreaService.create(learningArea));
    }
  }

  private createFromForm(): ILearningArea {
    return {
      ...new LearningArea(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      learningFacilityId: this.editForm.get(['learningFacilityId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILearningArea>>): void {
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

  trackById(index: number, item: ILearningFacility): any {
    return item.id;
  }
}
