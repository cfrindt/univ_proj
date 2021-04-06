import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { HttpResponse } from '@angular/common/http';
import { IOccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';
import moment from 'moment';

@Component({
  selector: 'jhi-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.scss']
})
export class OccupancyComponent implements OnInit {
  chart: Chart | undefined;
  occupancy: IOccupancyHistory[] = [];
  occCounter: number[] = [];
  timeStamp: string[] = [];

  constructor(protected smartLernplatzService: SmartLernplatzService) {}

  async ngOnInit(): Promise<void> {
    await this.getOccupancyToday();

    for (const event of this.occupancy) {
      if (event.occCounter !== undefined && event.timeStamp !== undefined) {
        this.occCounter.push(Number(event.occCounter));
        this.timeStamp.push(String(moment(event.timeStamp).format('HH:mm')));
      }
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.timeStamp,
        datasets: [
          {
            label: 'Anwesende Studierende',
            data: this.occCounter
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

  async getOccupancyToday(): Promise<void> {
    await this.smartLernplatzService
      .getOccupancyToday(this.getTodayAsString())
      .then((res: HttpResponse<IOccupancyHistory[]>) => (this.occupancy = res.body || []));
  }

  getTodayAsString(): string {
    const today = new Date();
    let todayMonth: string;
    let todayDate: string;

    if (today.getMonth() + 1 < 10) {
      todayMonth = '0' + '' + (today.getMonth() + 1);
    } else {
      todayMonth = '' + (today.getMonth() + 1);
    }

    if (today.getDate() < 10) {
      todayDate = '0' + '' + today.getDate();
    } else {
      todayDate = '' + today.getDate();
    }

    const todayStr = today.getFullYear() + '-' + todayMonth + '-' + todayDate;
    return todayStr;
  }
}
