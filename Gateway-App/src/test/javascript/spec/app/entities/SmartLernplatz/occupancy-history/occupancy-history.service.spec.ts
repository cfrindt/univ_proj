import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OccupancyHistoryService } from 'app/entities/SmartLernplatz/occupancy-history/occupancy-history.service';
import { IOccupancyHistory, OccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';

describe('Service Tests', () => {
  describe('OccupancyHistory Service', () => {
    let injector: TestBed;
    let service: OccupancyHistoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IOccupancyHistory;
    let expectedResult: IOccupancyHistory | IOccupancyHistory[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OccupancyHistoryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OccupancyHistory(0, currentDate, 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            timeStamp: currentDate.format(DATE_TIME_FORMAT),
            localDateStamp: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OccupancyHistory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            timeStamp: currentDate.format(DATE_TIME_FORMAT),
            localDateStamp: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timeStamp: currentDate,
            localDateStamp: currentDate
          },
          returnedFromService
        );

        service.create(new OccupancyHistory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OccupancyHistory', () => {
        const returnedFromService = Object.assign(
          {
            timeStamp: currentDate.format(DATE_TIME_FORMAT),
            occCounter: 1,
            leanringSpotId: 1,
            localDateStamp: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timeStamp: currentDate,
            localDateStamp: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OccupancyHistory', () => {
        const returnedFromService = Object.assign(
          {
            timeStamp: currentDate.format(DATE_TIME_FORMAT),
            occCounter: 1,
            leanringSpotId: 1,
            localDateStamp: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timeStamp: currentDate,
            localDateStamp: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OccupancyHistory', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
