import { Component, OnInit } from '@angular/core';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { ILearningSpot, LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { HttpResponse } from '@angular/common/http';
import { faComment, faPlug, faTimes, faVolumeMute, faCheckCircle, faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IBooking } from 'app/shared/model/SmartLernplatz/booking.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { createRequestOption } from 'app/shared/util/request-util';
import Chart from 'chart.js';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-learning-spots-overview',
  templateUrl: './learning-spots-overview.component.html',
  styleUrls: ['./learning-spots-overview.component.scss']
})
export class LearningSpotsOverviewComponent implements OnInit {
  isSaving = false;
  currentSpot?: ILearningSpot[];
  learningDurationToday: number | undefined;
  learnDurationLastWeek: number | undefined;
  chart: Chart | undefined;
  daysOfWeek: string[] = [];
  learnHoursLastWeek: number[] | [] | undefined;
  selectedLearningSpot: ILearningSpot | undefined;
  learningareas: ILearningArea[] = [];

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
    occupied: [null, [Validators.required]],
    socket: [null, [Validators.required]],
    silence: [null, [Validators.required]],
    learningAreaId: [null, Validators.required]
  });

  constructor(protected smartLernplatzService: SmartLernplatzService, private modalService: NgbModal, private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    await this.getAllLearningAreas();

    await this.getCurrentLearningSpot();
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

  async getCurrentLearningSpot(): Promise<void> {
    await this.smartLernplatzService
      .getLearningSpots()
      .then((res: HttpResponse<ILearningSpot[]>) => (this.currentSpot = res.body || undefined));
  }

  async openEdit(content: any, learningSpotId: number): Promise<void> {
    this.editForm.reset();

    const editModal: NgbModalRef = this.modalService.open(content, { centered: true });

    await this.getLearningSpotId(learningSpotId);

    if (this.selectedLearningSpot !== undefined) {
      this.updateForm(this.selectedLearningSpot);
    }
  }

  async openStats(content: any, learningSpotId: number): Promise<void> {
    const modal: NgbModalRef = this.modalService.open(content, { centered: true });

    await this.getLearningDurationTodayForLearningSpot(learningSpotId);
    await this.getLearningDurationLastWeek(learningSpotId);
    await this.getLearningDurationLastWeekPerDay(learningSpotId);

    for (let i = 0; i < 8; i++) {
      const day = new Date(new Date().setDate(new Date().getDate() - i));

      this.daysOfWeek[i] = this.dayToString(day.getDay()) + ' - ' + day.getDate() + '.' + (day.getMonth() + 1);
    }

    this.daysOfWeek = this.daysOfWeek.reverse();

    if (this.learnHoursLastWeek !== undefined) {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: [
            this.daysOfWeek[0],
            this.daysOfWeek[1],
            this.daysOfWeek[2],
            this.daysOfWeek[3],
            this.daysOfWeek[4],
            this.daysOfWeek[5],
            this.daysOfWeek[6],
            this.daysOfWeek[7]
          ],
          datasets: [
            {
              label: 'in Minuten',
              data: [
                this.learnHoursLastWeek[0],
                this.learnHoursLastWeek[1],
                this.learnHoursLastWeek[2],
                this.learnHoursLastWeek[3],
                this.learnHoursLastWeek[4],
                this.learnHoursLastWeek[5],
                this.learnHoursLastWeek[6],
                this.learnHoursLastWeek[7]
              ]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }

  close(): void {
    this.modalService.dismissAll();
  }

  async getLearningDurationTodayForLearningSpot(learningSpotId: number): Promise<void> {
    await this.smartLernplatzService
      .getLearningDurationTodayForLearningSpot(learningSpotId, this.getTodayAsString())
      .then((res: HttpResponse<number>) => (this.learningDurationToday = res.body || undefined));

    if (this.learningDurationToday === undefined) {
      this.learningDurationToday = 0;
    }
  }

  async getLearningDurationLastWeek(learningSpotId: number): Promise<void> {
    let lastWeekMonth = '';
    let lastWeekDate = '';

    if (this.lastWeek.getMonth() + 1 < 10) {
      lastWeekMonth = '0' + '' + (this.lastWeek.getMonth() + 1);
    } else {
      lastWeekMonth = '' + (this.lastWeek.getMonth() + 1);
    }

    if (this.lastWeek.getDate() < 10) {
      lastWeekDate = '0' + '' + this.lastWeek.getDate();
    } else {
      lastWeekDate = '' + this.lastWeek.getDate();
    }

    const lastWeekStr = this.lastWeek.getFullYear() + '-' + lastWeekMonth + '-' + lastWeekDate;

    await this.smartLernplatzService
      .getLearningDurationForLearningSpotInDateRange(learningSpotId, lastWeekStr, this.getTodayAsString())
      .then((res: HttpResponse<number>) => (this.learnDurationLastWeek = res.body || undefined));

    if (this.learnDurationLastWeek === undefined) {
      this.learnDurationLastWeek = 0;
    }
  }

  async getLearningDurationLastWeekPerDay(learningSpotId: number): Promise<void> {
    let lastWeekMonth = '';
    let lastWeekDate = '';

    if (this.lastWeek.getMonth() + 1 < 10) {
      lastWeekMonth = '0' + '' + (this.lastWeek.getMonth() + 1);
    } else {
      lastWeekMonth = '' + (this.lastWeek.getMonth() + 1);
    }

    if (this.lastWeek.getDate() + 1 < 10) {
      lastWeekDate = '0' + '' + this.lastWeek.getDate();
    } else {
      lastWeekDate = '' + this.lastWeek.getDate();
    }

    const lastWeekStr = this.lastWeek.getFullYear() + '-' + lastWeekMonth + '-' + lastWeekDate;

    await this.smartLernplatzService
      .getLearningDurationForLearningSpotInDateRangePerDay(learningSpotId, lastWeekStr, this.getTodayAsString())
      .then((res: HttpResponse<number[]>) => (this.learnHoursLastWeek = res.body || []));

    if (this.learnDurationLastWeek === undefined) {
      this.learnDurationLastWeek = 0;
    }
  }

  getTodayAsString(): string {
    let todayMonth: string;
    let todayDate: string;

    if (this.today.getMonth() + 1 < 10) {
      todayMonth = '0' + '' + (this.today.getMonth() + 1);
    } else {
      todayMonth = '' + (this.today.getMonth() + 1);
    }

    if (this.today.getDate() < 10) {
      todayDate = '0' + '' + this.today.getDate();
    } else {
      todayDate = '' + this.today.getDate();
    }

    const todayStr = this.today.getFullYear() + '-' + todayMonth + '-' + todayDate;
    return todayStr;
  }

  async getLearningSpotId(id: number): Promise<void> {
    await this.smartLernplatzService
      .getLearningSpotId(id)
      .then((res: HttpResponse<ILearningSpot>) => (this.selectedLearningSpot = res.body || undefined));
  }

  save(): void {
    this.isSaving = true;
    const learningSpot = this.createFromForm();
    if (learningSpot.id !== undefined) {
      this.subscribeToSaveResponse(this.smartLernplatzService.update(learningSpot));
    }

    this.modalService.dismissAll();

    this.getCurrentLearningSpot();
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

  updateForm(learningSpot: ILearningSpot): void {
    this.editForm.patchValue({
      id: learningSpot.id,
      occupied: learningSpot.occupied,
      socket: learningSpot.socket,
      silence: learningSpot.silence,
      learningAreaId: learningSpot.learningAreaId
    });
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<ILearningSpot>>): void {
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

  trackById(index: number, item: ILearningArea): any {
    return item.id;
  }

  editOccupancy(bl: boolean): void {
    if (this.selectedLearningSpot?.occupied !== undefined) {
      this.selectedLearningSpot.occupied = bl;

      this.updateForm(this.selectedLearningSpot);
    }
  }

  async delete(id: number): Promise<void> {
    await this.smartLernplatzService.delete(id);

    this.editForm.reset();
    this.modalService.dismissAll();

    this.getCurrentLearningSpot();
  }

  async getAllLearningAreas(): Promise<void> {
    await this.smartLernplatzService
      .getAllLearningAreas()
      .then((res: HttpResponse<ILearningArea[]>) => (this.learningareas = res.body || []));
  }
}
