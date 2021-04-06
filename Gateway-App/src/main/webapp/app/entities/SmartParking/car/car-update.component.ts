import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICar, Car } from 'app/shared/model/SmartParking/car.model';
import { CarService } from './car.service';

@Component({
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html'
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    licensePlate: [],
    manufacturer: [],
    color: [],
    owner: [null, [Validators.required]]
  });

  constructor(protected carService: CarService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.updateForm(car);
    });
  }

  updateForm(car: ICar): void {
    this.editForm.patchValue({
      id: car.id,
      licensePlate: car.licensePlate,
      manufacturer: car.manufacturer,
      color: car.color,
      owner: car.owner
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.createFromForm();
    if (car.id !== undefined) {
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));
    }
  }

  private createFromForm(): ICar {
    return {
      ...new Car(),
      id: this.editForm.get(['id'])!.value,
      licensePlate: this.editForm.get(['licensePlate'])!.value,
      manufacturer: this.editForm.get(['manufacturer'])!.value,
      color: this.editForm.get(['color'])!.value,
      owner: this.editForm.get(['owner'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
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
