import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParkingSpotService } from 'app/entities/SmartParking/parking-spot/parking-spot.service';
import { IParkingSpot, ParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';

describe('Service Tests', () => {
  describe('ParkingSpot Service', () => {
    let injector: TestBed;
    let service: ParkingSpotService;
    let httpMock: HttpTestingController;
    let elemDefault: IParkingSpot;
    let expectedResult: IParkingSpot | IParkingSpot[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ParkingSpotService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ParkingSpot(0, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ParkingSpot', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ParkingSpot()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ParkingSpot', () => {
        const returnedFromService = Object.assign(
          {
            spotType: 'BBBBBB',
            occupied: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ParkingSpot', () => {
        const returnedFromService = Object.assign(
          {
            spotType: 'BBBBBB',
            occupied: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ParkingSpot', () => {
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
