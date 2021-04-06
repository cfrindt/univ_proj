import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SmartLernplatzService } from 'app/smart-lernplatz/smart-lernplatz.service';
import { HttpResponse } from '@angular/common/http';
import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

@Component({
  selector: 'jhi-learning-analytics',
  templateUrl: './learning-analytics.component.html',
  styleUrls: ['./learning-analytics.component.scss']
})
export class LearningAnalyticsComponent implements OnInit {
  chart: Chart | undefined;
  specificDay?: number;
  today = new Date();
  lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
  learnHoursLastWeek: number[] | [] | undefined;
  todayMonth = '';
  todayDate = '';
  lastWeekMonth = '';
  lastWeekDate = '';
  daysOfWeek: string[] = [];
  learnHoursLastWeekTotal: number | undefined;

  constructor(protected smartLernplatzService: SmartLernplatzService) {}

  async ngOnInit(): Promise<void> {
    await this.getLearningDurationLastWeekPerDay();
    await this.getSpecificLearningDay();
    await this.getLearningDurationLastWeekTotal();

    for (let i = 0; i < 8; i++) {
      const day = new Date(new Date().setDate(new Date().getDate() - i));

      this.daysOfWeek[i] = this.dayToString(day.getDay()) + ' - ' + day.getDate() + '.' + (day.getMonth() + 1);
    }

    this.daysOfWeek = this.daysOfWeek.reverse();

    if (this.learnHoursLastWeek !== undefined) {
      /*
            alert(this.learnHoursLastWeek[0] + " " + this.learnHoursLastWeek[1] + " " + this.learnHoursLastWeek[2] + " " +
              this.learnHoursLastWeek[3] + " " + this.learnHoursLastWeek[4] + " " + this.learnHoursLastWeek[5] + "");

      */
      this.chart = new Chart('canvas', {
        type: 'bar',
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

  async getSpecificLearningDay(): Promise<void> {
    await this.smartLernplatzService
      .getSpecificLearningDay(this.getTodayAsString())
      .then((res: HttpResponse<number>) => (this.specificDay = res.body || undefined));
  }

  async getLearningDurationLastWeekPerDay(): Promise<void> {
    if (this.lastWeek.getMonth() + 1 < 10) {
      this.lastWeekMonth = '0' + '' + (this.lastWeek.getMonth() + 1);
    } else {
      this.lastWeekMonth = '' + (this.lastWeek.getMonth() + 1);
    }

    if (this.lastWeek.getDate() < 10) {
      this.lastWeekDate = '0' + '' + this.lastWeek.getDate();
    } else {
      this.lastWeekDate = '' + this.lastWeek.getDate();
    }

    const lastWeekStr = this.lastWeek.getFullYear() + '-' + this.lastWeekMonth + '-' + this.lastWeekDate;

    await this.smartLernplatzService
      .getLearningDurationInDateRangePerDay(lastWeekStr, this.getTodayAsString())
      .then((res: HttpResponse<number[]>) => (this.learnHoursLastWeek = res.body || []));
  }

  async getLearningDurationLastWeekTotal(): Promise<void> {
    if (this.lastWeek.getMonth() + 1 < 10) {
      this.lastWeekMonth = '0' + '' + (this.lastWeek.getMonth() + 1);
    } else {
      this.lastWeekMonth = '' + (this.lastWeek.getMonth() + 1);
    }

    if (this.lastWeek.getDate() + 1 < 10) {
      this.lastWeekDate = '0' + '' + this.lastWeek.getDate();
    } else {
      this.lastWeekDate = '' + this.lastWeek.getDate();
    }

    const lastWeekStr = this.lastWeek.getFullYear() + '-' + this.lastWeekMonth + '-' + this.lastWeekDate;

    await this.smartLernplatzService
      .getLearningDurationInDateRangeTotal(lastWeekStr, this.getTodayAsString())
      .then((res: HttpResponse<number>) => (this.learnHoursLastWeekTotal = res.body || undefined));
  }

  getTodayAsString(): string {
    if (this.today.getMonth() + 1 < 10) {
      this.todayMonth = '0' + '' + (this.today.getMonth() + 1);
    } else {
      this.todayMonth = '' + (this.today.getMonth() + 1);
    }

    if (this.today.getDate() < 10) {
      this.todayDate = '0' + '' + this.today.getDate();
    } else {
      this.todayDate = '' + this.today.getDate();
    }

    const todayStr = this.today.getFullYear() + '-' + this.todayMonth + '-' + this.todayDate;
    return todayStr;
  }
}
