import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParkingArea, ParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ParkingAreaService } from './parking-area.service';
import { IParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';
import { ParkingFacilityService } from 'app/entities/SmartParking/parking-facility/parking-facility.service';

@Component({
  selector: 'jhi-parking-area-update',
  templateUrl: './parking-area-update.component.html'
})
export class ParkingAreaUpdateComponent implements OnInit {
  isSaving = false;
  parkingfacilities: IParkingFacility[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    capacity: [null, [Validators.required, Validators.min(0)]],
    completlyOccupied: [],
    parkingFacilityId: [null, Validators.required]
  });

  constructor(
    protected parkingAreaService: ParkingAreaService,
    protected parkingFacilityService: ParkingFacilityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parkingArea }) => {
      this.updateForm(parkingArea);

      this.parkingFacilityService.query().subscribe((res: HttpResponse<IParkingFacility[]>) => (this.parkingfacilities = res.body || []));
    });
  }

  updateForm(parkingArea: IParkingArea): void {
    this.editForm.patchValue({
      id: parkingArea.id,
      name: parkingArea.name,
      capacity: parkingArea.capacity,
      completlyOccupied: parkingArea.completlyOccupied,
      parkingFacilityId: parkingArea.parkingFacilityId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parkingArea = this.createFromForm();
    if (parkingArea.id !== undefined) {
      this.subscribeToSaveResponse(this.parkingAreaService.update(parkingArea));
    } else {
      this.subscribeToSaveResponse(this.parkingAreaService.create(parkingArea));
    }
  }

  private createFromForm(): IParkingArea {
    return {
      ...new ParkingArea(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      capacity: this.editForm.get(['capacity'])!.value,
      completlyOccupied: this.editForm.get(['completlyOccupied'])!.value,
      parkingFacilityId: this.editForm.get(['parkingFacilityId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParkingArea>>): void {
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

  trackById(index: number, item: IParkingFacility): any {
    return item.id;
  }
}
