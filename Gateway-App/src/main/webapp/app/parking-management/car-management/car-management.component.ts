import { Component, OnInit } from '@angular/core';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpResponse } from '@angular/common/http';
import { Car, ICar } from 'app/shared/model/SmartParking/car.model';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.scss']
})
export class CarManagementComponent implements OnInit {
  isSaving = false;
  cars?: ICar[];

  faPlus = faPlus;
  faCar = faCar;

  editForm = this.fb.group({
    license: [],
    manufacturer: [],
    color: []
  });

  constructor(protected parkingManagementService: ParkingManagementService, protected modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCarsOfCurrentUser();
  }

  loadCarsOfCurrentUser(): void {
    this.parkingManagementService.getAllCarsOfUser().subscribe((res: HttpResponse<ICar[]>) => (this.cars = res.body || []));
  }

  openNewCarModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  submitForm(): void {
    this.saveCar();
  }

  saveCar(): void {
    const car = this.createFromForm();
    this.subscribeToSaveResponse(this.parkingManagementService.createCar(car));
    this.modalService.dismissAll();
    this.editForm.reset();
  }

  private createFromForm(): ICar {
    return {
      ...new Car(),
      id: undefined,
      licensePlate: this.editForm.get(['license'])!.value,
      manufacturer: this.editForm.get(['manufacturer'])!.value,
      color: this.editForm.get(['color'])!.value,
      owner: 0
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
    this.loadCarsOfCurrentUser();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
