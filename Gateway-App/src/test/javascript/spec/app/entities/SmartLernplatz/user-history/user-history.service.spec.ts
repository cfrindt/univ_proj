import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UserHistoryService } from 'app/entities/SmartLernplatz/user-history/user-history.service';
import { IUserHistory, UserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';

describe('Service Tests', () => {
  describe('UserHistory Service', () => {
    let injector: TestBed;
    let service: UserHistoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserHistory;
    let expectedResult: IUserHistory | IUserHistory[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UserHistoryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UserHistory(0, 0, currentDate, currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            pauseStartStamp: currentDate.format(DATE_TIME_FORMAT),
            pauseEndStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingStartStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingEndStamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UserHistory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            pauseStartStamp: currentDate.format(DATE_TIME_FORMAT),
            pauseEndStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingStartStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingEndStamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pauseStartStamp: currentDate,
            pauseEndStamp: currentDate,
            bookingStartStamp: currentDate,
            bookingEndStamp: currentDate
          },
          returnedFromService
        );

        service.create(new UserHistory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UserHistory', () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            pauseStartStamp: currentDate.format(DATE_TIME_FORMAT),
            pauseEndStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingStartStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingEndStamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pauseStartStamp: currentDate,
            pauseEndStamp: currentDate,
            bookingStartStamp: currentDate,
            bookingEndStamp: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UserHistory', () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            pauseStartStamp: currentDate.format(DATE_TIME_FORMAT),
            pauseEndStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingStartStamp: currentDate.format(DATE_TIME_FORMAT),
            bookingEndStamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pauseStartStamp: currentDate,
            pauseEndStamp: currentDate,
            bookingStartStamp: currentDate,
            bookingEndStamp: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UserHistory', () => {
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
