import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILearningFacility, LearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';
import { LearningFacilityService } from './learning-facility.service';

@Component({
  selector: 'jhi-learning-facility-update',
  templateUrl: './learning-facility-update.component.html'
})
export class LearningFacilityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(
    protected learningFacilityService: LearningFacilityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ learningFacility }) => {
      this.updateForm(learningFacility);
    });
  }

  updateForm(learningFacility: ILearningFacility): void {
    this.editForm.patchValue({
      id: learningFacility.id,
      name: learningFacility.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const learningFacility = this.createFromForm();
    if (learningFacility.id !== undefined) {
      this.subscribeToSaveResponse(this.learningFacilityService.update(learningFacility));
    } else {
      this.subscribeToSaveResponse(this.learningFacilityService.create(learningFacility));
    }
  }

  private createFromForm(): ILearningFacility {
    return {
      ...new LearningFacility(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILearningFacility>>): void {
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
}
