import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParkingSpot, ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { ParkingSpotService } from './parking-spot.service';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ParkingAreaService } from 'app/entities/SmartParking/parking-area/parking-area.service';

@Component({
  selector: 'jhi-parking-spot-update',
  templateUrl: './parking-spot-update.component.html'
})
export class ParkingSpotUpdateComponent implements OnInit {
  isSaving = false;
  parkingareas: IParkingArea[] = [];

  editForm = this.fb.group({
    id: [],
    spotType: [],
    occupied: [],
    parkingAreaId: [null, Validators.required]
  });

  constructor(
    protected parkingSpotService: ParkingSpotService,
    protected parkingAreaService: ParkingAreaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parkingSpot }) => {
      this.updateForm(parkingSpot);

      this.parkingAreaService.query().subscribe((res: HttpResponse<IParkingArea[]>) => (this.parkingareas = res.body || []));
    });
  }

  updateForm(parkingSpot: IParkingSpot): void {
    this.editForm.patchValue({
      id: parkingSpot.id,
      spotType: parkingSpot.spotType,
      occupied: parkingSpot.occupied,
      parkingAreaId: parkingSpot.parkingAreaId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parkingSpot = this.createFromForm();
    if (parkingSpot.id !== undefined) {
      this.subscribeToSaveResponse(this.parkingSpotService.update(parkingSpot));
    } else {
      this.subscribeToSaveResponse(this.parkingSpotService.create(parkingSpot));
    }
  }

  private createFromForm(): IParkingSpot {
    return {
      ...new ParkingSpot(),
      id: this.editForm.get(['id'])!.value,
      spotType: this.editForm.get(['spotType'])!.value,
      occupied: this.editForm.get(['occupied'])!.value,
      parkingAreaId: this.editForm.get(['parkingAreaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParkingSpot>>): void {
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

  trackById(index: number, item: IParkingArea): any {
    return item.id;
  }
}
