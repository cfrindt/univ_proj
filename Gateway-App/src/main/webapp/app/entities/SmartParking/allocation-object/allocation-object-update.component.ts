import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAllocationObject, AllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';
import { AllocationObjectService } from './allocation-object.service';

@Component({
  selector: 'jhi-allocation-object-update',
  templateUrl: './allocation-object-update.component.html'
})
export class AllocationObjectUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    occupied: [],
    type: []
  });

  constructor(
    protected allocationObjectService: AllocationObjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ allocationObject }) => {
      this.updateForm(allocationObject);
    });
  }

  updateForm(allocationObject: IAllocationObject): void {
    this.editForm.patchValue({
      id: allocationObject.id,
      occupied: allocationObject.occupied,
      type: allocationObject.type
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const allocationObject = this.createFromForm();
    if (allocationObject.id !== undefined) {
      this.subscribeToSaveResponse(this.allocationObjectService.update(allocationObject));
    } else {
      this.subscribeToSaveResponse(this.allocationObjectService.create(allocationObject));
    }
  }

  private createFromForm(): IAllocationObject {
    return {
      ...new AllocationObject(),
      id: this.editForm.get(['id'])!.value,
      occupied: this.editForm.get(['occupied'])!.value,
      type: this.editForm.get(['type'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAllocationObject>>): void {
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
