import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BookingService } from 'app/entities/SmartParking/booking/booking.service';
import { IBooking, Booking } from 'app/shared/model/SmartParking/booking.model';

describe('Service Tests', () => {
  describe('Booking Service', () => {
    let injector: TestBed;
    let service: BookingService;
    let httpMock: HttpTestingController;
    let elemDefault: IBooking;
    let expectedResult: IBooking | IBooking[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BookingService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Booking(0, currentDate, currentDate, 0, false, currentDate, 0, false, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            reservationTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Booking', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            reservationTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            reservationTime: currentDate
          },
          returnedFromService
        );

        service.create(new Booking()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Booking', () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            parkingTime: 'BBBBBB',
            reserved: true,
            reservationTime: currentDate.format(DATE_TIME_FORMAT),
            cost: 1,
            bookingActive: true,
            userId: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            reservationTime: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Booking', () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            parkingTime: 'BBBBBB',
            reserved: true,
            reservationTime: currentDate.format(DATE_TIME_FORMAT),
            cost: 1,
            bookingActive: true,
            userId: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            reservationTime: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Booking', () => {
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
