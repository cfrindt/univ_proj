import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FormBuilder, Validators } from '@angular/forms';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { IParkingSpot, ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { faComment, faPlug, faTimes, faVolumeMute, faCheckCircle, faTimesCircle, faEdit, faTools } from '@fortawesome/free-solid-svg-icons';
import { ParkingSpotService } from 'app/entities/SmartParking/parking-spot/parking-spot.service';
import { ParkingAreaService } from 'app/entities/SmartParking/parking-area/parking-area.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-parking-admin',
  templateUrl: './parking-admin.component.html',
  styleUrls: ['./parking-admin.component.scss']
})
export class ParkingAdminComponent implements OnInit {
  isSaving = false;
  currentSpot?: IParkingSpot[];
  learningDurationToday: number | undefined;
  learnDurationLastWeek: number | undefined;
  chart: Chart | undefined;
  daysOfWeek: string[] = [];
  learnHoursLastWeek: number[] | [] | undefined;
  selectedLearningSpot: IParkingSpot | undefined;
  learningareas: IParkingArea[] = [];
  parkingareas: IParkingArea[] = [];

  today = new Date();
  lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));

  faCheckCircle = faCheckCircle;
  faComment = faComment;
  faPlug = faPlug;
  faTimes = faTimes;
  faVolumeMute = faVolumeMute;
  faTimesCircle = faTimesCircle;
  faEdit = faEdit;

  editForm = this.fb.group({
    id: [],
    spotType: [],
    occupied: [],
    parkingAreaId: [null, Validators.required]
  });

  constructor(protected parkingManagementService: ParkingManagementService, private modalService: NgbModal, private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    await this.getCurrentLearningSpot();

    await this.getAllParkingAreas();
  }

  dayToString(day: number): string {
    switch (day) {
      case 0: {
        return 'Sonntag';
        break;
      }
      case 1: {
        return 'Montag';
        break;
      }
      case 2: {
        return 'Dienstag';
        break;
      }
      case 3: {
        return 'Mittwoch';
        break;
      }
      case 4: {
        return 'Donnerstag';
        break;
      }
      case 5: {
        return 'Freitag';
        break;
      }
      case 6: {
        return 'Samstag';
        break;
      }
      default: {
        return 'NONE';
      }
    }
  }

  //ruft Methode von SmartlernplatzService auf, speichert Rückgabe in CurrentSpot
  async getCurrentLearningSpot(): Promise<void> {
    await this.parkingManagementService
      .getAllParkingSpotsInParkingFacility(1)
      .then((res: HttpResponse<IParkingArea[]>) => (this.currentSpot = res.body || []));
  }

  async openEdit(content: any, learningSpotId: number): Promise<void> {
    this.editForm.reset();

    const editModal: NgbModalRef = this.modalService.open(content, { centered: true });

    await this.getLearningSpotId(learningSpotId);

    if (this.selectedLearningSpot !== undefined) {
      this.updateForm(this.selectedLearningSpot);
    }

    this.parkingManagementService.query().subscribe((res: HttpResponse<IParkingArea[]>) => (this.learningareas = res.body || []));
  }

  close(): void {
    this.modalService.dismissAll();
  }

  async getLearningSpotId(id: number): Promise<void> {
    await this.parkingManagementService
      .getParkingSpot(id)
      .then((res: HttpResponse<IParkingSpot>) => (this.selectedLearningSpot = res.body || undefined));
  }

  save(): void {
    this.isSaving = true;
    const learningSpot = this.createFromForm();
    if (learningSpot.id !== undefined) {
      this.subscribeToSaveResponse(this.parkingManagementService.update(learningSpot));
    }

    this.modalService.dismissAll();
    this.getCurrentLearningSpot();
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

  updateForm(parkingSpot: IParkingSpot): void {
    this.editForm.patchValue({
      id: parkingSpot.id,
      spotType: parkingSpot.spotType,
      occupied: parkingSpot.occupied,
      parkingAreaId: parkingSpot.parkingAreaId
    });
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IParkingSpot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;

    this.editForm.reset();
    this.getCurrentLearningSpot();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IParkingArea): any {
    return item.id;
  }

  async getAllParkingAreas(): Promise<void> {
    await this.parkingManagementService
      .getAllParkingAreasOfFacility(1)
      .then((res: HttpResponse<IParkingArea[]>) => (this.parkingareas = res.body || []));
  }

  async delete(id?: number): Promise<void> {
    await this.parkingManagementService.delete(id);

    this.editForm.reset();
    this.modalService.dismissAll();

    this.getCurrentLearningSpot();
  }
}
