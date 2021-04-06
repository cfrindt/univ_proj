import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { ICar } from 'app/shared/model/SmartParking/car.model';
import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';
import { Booking, IBooking } from 'app/shared/model/SmartParking/booking.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUser } from '../../../../../../jhipster-registry/src/main/webapp/app/core/user/user.model';

type ParkingAreasResponse = HttpResponse<IParkingArea[]>;
type CarsResponse = HttpResponse<ICar[]>;
type ParkingSpotResponse = HttpResponse<IParkingSpot>;
type ParkingSpotsResponse = HttpResponse<IParkingSpot[]>;
type BookingsResponse = HttpResponse<IBooking[]>;
type BookingResponse = HttpResponse<IBooking>;
type CarResponse = HttpResponse<ICar>;
type UserResponse = HttpResponse<IUser>;

@Injectable({
  providedIn: 'root'
})
export class ParkingManagementService {
  public resourceUrlParkingAreas = SERVER_API_URL + 'services/smartparking/api/parking-areas';
  public resourceUrlCars = SERVER_API_URL + 'services/smartparking/api/cars';
  public resourceUrlParkingSpots = SERVER_API_URL + 'services/smartparking/api/parking-spots';
  public resourceUrlBookings = SERVER_API_URL + 'services/smartparking/api/bookings';
  public resourceUrlReserving = SERVER_API_URL + 'services/smartparking/api/booking-management';
  public accountUrl = SERVER_API_URL + 'api/account';

  constructor(protected http: HttpClient) {}

  getParkingAreasOfFacility(facilityId: number): Observable<ParkingAreasResponse> {
    return this.http.get<IParkingArea[]>(`${this.resourceUrlParkingAreas}/in-parking-facility/${facilityId}`, { observe: 'response' });
  }

  async getAllParkingAreasOfFacility(facilityId: number): Promise<ParkingAreasResponse> {
    return await this.http
      .get<IParkingArea[]>(`${this.resourceUrlParkingAreas}/in-parking-facility/${facilityId}`, { observe: 'response' })
      .toPromise();
  }

  async getAllParkingSpotsOfArea(areaId: number): Promise<ParkingSpotsResponse> {
    return await this.http
      .get<IParkingSpot[]>(`${this.resourceUrlParkingSpots}/in-parking-area/${areaId}`, { observe: 'response' })
      .toPromise();
  }

  getAllFreeParkingSpotsInParkingArea(areaId: number | undefined): Observable<ParkingSpotsResponse> {
    return this.http.get<IParkingSpot[]>(`${this.resourceUrlParkingSpots}/in-parking-area/${areaId}/free`, { observe: 'response' });
  }

  getAllCarsOfUser(): Observable<CarsResponse> {
    return this.http.get<IParkingArea[]>(`${this.resourceUrlCars}/of-current-user`, { observe: 'response' });
  }

  createCar(car: ICar): Observable<CarResponse> {
    return this.http.post<ICar>(`${SERVER_API_URL}/services/smartparking/api/car`, car, { observe: 'response' });
  }

  getAllParkingSpots(areaId: number | undefined): Observable<ParkingSpotsResponse> {
    return this.http.get<IParkingSpot[]>(`${this.resourceUrlParkingSpots}/in-parking-area/${areaId}`, { observe: 'response' });
  }

  async getParkingSpot(id: number | undefined): Promise<HttpResponse<IParkingSpot>> {
    return await this.http
      .get<IParkingSpot>(`${this.resourceUrlParkingSpots}/${id}`, { observe: 'response' })
      .toPromise();
  }

  getAllActiveBookingsOfCurrentUser(): Observable<BookingsResponse> {
    return this.http.get<IBooking[]>(`${this.resourceUrlBookings}/of-current-user-and-active`, { observe: 'response' });
  }

  createNewReservation(parkingSpotId: number, license: string): Observable<BookingResponse> {
    const booking = new Booking();
    return this.http.post<IBooking>(
      `${this.resourceUrlReserving}/set-reservation/on-parking-spot/${parkingSpotId}/with-car/${license}`,
      booking,
      { observe: 'response' }
    );
  }

  createNewBooking(booking: IBooking): Observable<BookingResponse> {
    return this.http.post<IBooking>(
      `${this.resourceUrlReserving}/set-booking/on-parking-spot/${booking.parkingSpotId}/with-car/${booking.carLicensePlate}`,
      booking,
      { observe: 'response' }
    );
  }

  async getAllParkingSpotsInParkingFacility(facilityId: number | undefined): Promise<ParkingSpotsResponse> {
    return this.http
      .get<IParkingSpot[]>(`${this.resourceUrlParkingSpots}/in-parking-facility/${facilityId}`, { observe: 'response' })
      .toPromise();
  }

  async endBooking(id?: number): Promise<BookingResponse> {
    return this.http
      .put<any>(`${this.resourceUrlReserving}/close-booking/${id}`, { observe: 'response' })
      .toPromise();
  }

  async getCompletedBookings(): Promise<BookingsResponse> {
    return this.http
      .get<IBooking[]>(`${this.resourceUrlReserving}/completed-bookings/current-user/`, { observe: `response` })
      .toPromise();
  }

  async numberOfFreeParkingSpotsInArea(parkingAreaId: number | undefined): Promise<HttpResponse<number>> {
    return await this.http
      .get<number>(`${this.resourceUrlParkingAreas}/${parkingAreaId}/free-parking-spots`, { observe: 'response' })
      .toPromise();
  }

  query(req?: any): Observable<ParkingSpotsResponse> {
    const options = createRequestOption(req);
    return this.http.get<IParkingSpot[]>(`${this.resourceUrlParkingSpots}`, { params: options, observe: 'response' });
  }

  update(parkingSpot: IParkingSpot): Observable<ParkingSpotResponse> {
    return this.http.put<IParkingSpot>(`${this.resourceUrlParkingSpots}`, parkingSpot, { observe: 'response' });
  }

  async delete(id?: number): Promise<ParkingSpotResponse> {
    return this.http
      .delete<any>(`${this.resourceUrlParkingSpots}/${id}`, { observe: 'response' })
      .toPromise();
  }

  async getAllBookings(): Promise<BookingsResponse> {
    return this.http
      .get<IBooking[]>(`${this.resourceUrlBookings}`, { observe: 'response' })
      .toPromise();
  }

  async getCurrentUserInformation(): Promise<UserResponse> {
    return this.http
      .get<IUser>(`${this.accountUrl}`, { observe: 'response' })
      .toPromise();
  }
}
