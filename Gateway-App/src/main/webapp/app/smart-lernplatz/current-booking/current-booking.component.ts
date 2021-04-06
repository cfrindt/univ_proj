import { Component, OnInit } from '@angular/core';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { HttpResponse } from '@angular/common/http';
import { ILearningSpot, LearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { Booking, IBooking } from 'app/shared/model/SmartLernplatz/booking.model';
import { BookingExtended, IBookingExtended } from 'app/shared/model/SmartLernplatz/booking-extended.model';
import { IUserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { Chart } from 'chart.js';
import moment, { Moment } from 'moment';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.scss']
})
export class CurrentBookingComponent implements OnInit {
  currentBooking?: IBookingExtended;
  pauseHistory?: IUserHistory[];
  todaysPauses: IUserHistory[] = [];
  paused: number;
  currentLearningSpotId: number | undefined;
  currentLearningAreaName: string | undefined;
  currentBookingStart: Moment | undefined;

  constructor(protected smartLernplatzService: SmartLernplatzService, private router: Router, private modalService: NgbModal) {
    this.paused = 0;
  }

  async ngOnInit(): Promise<void> {
    await this.getCurrentBooking();
    await this.getPausesofUser();

    if (this.currentBooking?.learningSpot.id !== undefined) {
      this.currentLearningSpotId = this.currentBooking.learningSpot.id;
    } else {
      this.currentLearningSpotId = 0;
    }

    if (this.currentBooking?.learningSpot.learningArea.name !== undefined) {
      this.currentLearningAreaName = this.currentBooking.learningSpot.learningArea.name;
    } else {
      this.currentLearningAreaName = '';
    }

    if (this.currentBooking?.bookingStartStamp !== undefined) {
      this.currentBookingStart = this.currentBooking.bookingStartStamp;
    } else {
      this.currentBookingStart = moment('2020-01-01');
    }

    const today = moment(new Date());

    this.todaysPauses = [];

    this.pauseHistory?.forEach(pause => {
      if (
        pause.pauseStartStamp !== undefined &&
        pause.pauseEndStamp !== undefined &&
        moment(pause.pauseStartStamp).year() === today.year() &&
        moment(pause.pauseStartStamp).month() === today.month() &&
        moment(pause.pauseStartStamp).date() === today.date()
      ) {
        this.todaysPauses.push(pause);
      }
    });

    this.updatePause();
  }

  updatePause(): void {
    if (this.currentBooking?.isPaused === true) {
      this.paused = 1;
    } else {
      if (this.currentBooking?.isPaused === false) {
        this.paused = -1;
      } else {
        this.paused = 0;
      }
    }
  }

  async getCurrentBooking(): Promise<void> {
    await this.smartLernplatzService
      .getCurrentBooking()
      .then((res: HttpResponse<IBookingExtended>) => (this.currentBooking = res.body || undefined));
  }

  async pause(startPause: boolean): Promise<void> {
    if (this.currentBooking !== undefined) {
      await this.smartLernplatzService.pauseABooking(this.currentBooking?.id).toPromise();
    }

    await this.getCurrentBooking();

    /*  if (startPause) {
              //Pause wird gestartet

              this.updatePause();
          } else {
              //Pause wird beendet*/
    await this.ngOnInit();
  }

  async getPausesofUser(): Promise<void> {
    await this.smartLernplatzService
      .getPausesOfCurrentUser()
      .then((res: HttpResponse<IUserHistory[]>) => (this.pauseHistory = res.body || undefined));
  }

  trackId(index: number, item: IUserHistory): number {
    return item.id!;
  }

  async delete(): Promise<void> {
    await this.smartLernplatzService.deleteBooking(this.currentBooking?.id);
    this.modalService.dismissAll();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/smart-lernplatz'], { queryParams: { undefined } });

    //alert("JAJA");
  }

  openNewCarModal(content: any): void {
    const modal: NgbModalRef = this.modalService.open(content, { centered: true });
  }

  close(): void {
    this.modalService.dismissAll();
  }
}
