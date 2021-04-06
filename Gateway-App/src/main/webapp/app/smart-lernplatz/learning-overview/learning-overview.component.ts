import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { Booking, IBooking } from 'app/shared/model/SmartLernplatz/booking.model';
import { Moment } from 'moment';
import DateTimeFormat = Intl.DateTimeFormat;
import { faComment, faPlug, faTimes, faVolumeMute, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-learning-overview',
  templateUrl: './learning-overview.component.html',
  styleUrls: ['./learning-overview.component.scss']
})
export class LearningOverviewComponent implements OnInit {
  learningSpots?: ILearningSpot[];
  learningAreas?: ILearningArea[];

  editProfileForm: FormGroup;
  isSaving = false;
  selectedLearningSpotId: number;

  faCheckCircle = faCheckCircle;
  faComment = faComment;
  faPlug = faPlug;
  faTimes = faTimes;
  faVolumeMute = faVolumeMute;

  editForm = this.fb.group({
    carId: [null, Validators.required]
  });

  bookingForm = this.fb.group({
    learningSpotId: []
  });

  constructor(
    protected smartLernplatzService: SmartLernplatzService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      learningSpotId: ['']
    });

    this.selectedLearningSpotId = 0;
  }

  openNewCarModal(content: any, learningSpot: number): void {
    const modal: NgbModalRef = this.modalService.open(content, { centered: true });

    this.selectedLearningSpotId = learningSpot;
  }

  save(): void {
    this.subscribeToSaveResponse(this.smartLernplatzService.createBooking(this.createFromForm()));
    this.modalService.dismissAll();
    this.editForm.reset();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/smart-lernplatz'], { queryParams: { undefined } });
  }

  private createFromForm(): IBooking {
    return {
      ...new Booking(),
      learningSpotId: this.selectedLearningSpotId,
      userId: 0
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.modalService.dismissAll();
    this.loadLearningSpots();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackId(index: number, item: ILearningArea): number {
    return item.id!;
  }

  close(): void {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.loadLearningSpots();
    this.loadLearningAreas();
  }

  loadLearningSpots(): void {
    this.smartLernplatzService
      .getAllLearningSpots()
      .subscribe((res: HttpResponse<ILearningSpot[]>) => (this.learningSpots = res.body || []));
  }

  loadLearningAreas(): void {
    this.smartLernplatzService.getAllLearningAreas().then((res: HttpResponse<ILearningArea[]>) => (this.learningAreas = res.body || []));
  }
}
