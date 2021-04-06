import { Component, OnInit } from '@angular/core';
import { ParkingManagementService } from 'app/parking-management/parking-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IBooking } from 'app/shared/model/SmartParking/booking.model';
import Chart from 'chart.js';
import { Moment } from 'moment/moment';
import moment from 'moment';

@Component({
  selector: 'jhi-cost-overview',
  templateUrl: './cost-overview.component.html',
  styleUrls: ['./cost-overview.component.scss']
})
export class CostOverviewComponent implements OnInit {
  completedBooking?: IBooking[];
  parkingTime: number[] = [];
  park: IBooking[] | undefined;

  constructor(protected parkingManagementService: ParkingManagementService) {}

  async ngOnInit(): Promise<void> {
    await this.getCompletedBookings();

    if (this.completedBooking !== undefined) {
      for (let i = 0; i < this.completedBooking?.length; i++) {
        const k = String(this.completedBooking[i].parkingTime);

        const pt = k.split('PT', 2);

        let hour = '';
        let minute = '';

        let m: String[];
        let h: String[] = [];

        if (k.includes('H')) {
          h = pt[1].split('H', 3);
          m = h[1].split('M', 2);

          hour = h[0] + '';
          minute = m[0] + '';

          if (m[0].length === 1) {
            m[0] = '0' + m[0];
          }

          this.completedBooking[i].parkingTime = h[0] + ':' + m[0] + ' Stunden';
        } else {
          if (k.includes('M')) {
            m = pt[1].split('M', 2);
            minute = m[0] + '';

            if (m[0].length === 1) {
              m[0] = '0' + m[0];
            }

            this.completedBooking[i].parkingTime = m[0] + ' Minuten';
          } else {
            if (!k.includes('M') && !k.includes('H')) {
              this.completedBooking[i].parkingTime = '0 Minuten';
            }
          }
        }
      }
    }
  }

  compare(booking: IBooking): moment.Duration {
    return moment.duration(booking.endTime?.diff(booking.startTime));
  }

  async getCompletedBookings(): Promise<void> {
    await this.parkingManagementService
      .getCompletedBookings()
      .then((res: HttpResponse<IBooking[]>) => (this.completedBooking = res.body || undefined));
  }
}
