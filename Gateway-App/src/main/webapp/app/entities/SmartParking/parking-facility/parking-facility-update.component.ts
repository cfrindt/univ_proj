import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParkingFacility, ParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';
import { ParkingFacilityService } from './parking-facility.service';

@Component({
  selector: 'jhi-parking-facility-update',
  templateUrl: './parking-facility-update.component.html'
})
export class ParkingFacilityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    capacity: [null, [Validators.required, Validators.min(0)]],
    fullyOccupied: []
  });

  constructor(
    protected parkingFacilityService: ParkingFacilityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parkingFacility }) => {
      this.updateForm(parkingFacility);
    });
  }

  updateForm(parkingFacility: IParkingFacility): void {
    this.editForm.patchValue({
      id: parkingFacility.id,
      name: parkingFacility.name,
      capacity: parkingFacility.capacity,
      fullyOccupied: parkingFacility.fullyOccupied
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parkingFacility = this.createFromForm();
    if (parkingFacility.id !== undefined) {
      this.subscribeToSaveResponse(this.parkingFacilityService.update(parkingFacility));
    } else {
      this.subscribeToSaveResponse(this.parkingFacilityService.create(parkingFacility));
    }
  }

  private createFromForm(): IParkingFacility {
    return {
      ...new ParkingFacility(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      capacity: this.editForm.get(['capacity'])!.value,
      fullyOccupied: this.editForm.get(['fullyOccupied'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParkingFacility>>): void {
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
