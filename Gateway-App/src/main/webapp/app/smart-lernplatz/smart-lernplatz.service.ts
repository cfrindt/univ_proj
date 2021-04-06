import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';
import { Injectable } from '@angular/core';
import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';
import { IBooking } from 'app/shared/model/SmartLernplatz/booking.model';
import { IBookingExtended } from 'app/shared/model/SmartLernplatz/booking-extended.model';
import { IUserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';
import { IOccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';
import { IUser } from '../../../../../../jhipster-registry/src/main/webapp/app/core/user/user.model';

type LearningSpotsResponse = HttpResponse<ILearningSpot[]>;
type LearningSpotResponse = HttpResponse<ILearningSpot>;
type UserResponse = HttpResponse<IUser>;

type LearningAreaResponse = HttpResponse<ILearningArea[]>;
type BookingResponse = HttpResponse<IBooking>;
type BookingFullResponse = HttpResponse<IBookingExtended>;
type UserHistoriesResponse = HttpResponse<IUserHistory[]>;
type NumberResponse = HttpResponse<number>;
type NumbersResponse = HttpResponse<number[]>;
type OccupanciesResponse = HttpResponse<IOccupancyHistory[]>;

@Injectable({
  providedIn: 'root'
})
export class SmartLernplatzService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api';
  public accountUrl = SERVER_API_URL + 'api/account';

  constructor(protected http: HttpClient) {}

  getAllLearningSpots(): Observable<LearningSpotsResponse> {
    return this.http.get<ILearningSpot[]>(`${this.resourceUrl}/learning-spots`, { observe: 'response' });
  }

  async getAllLearningAreas(): Promise<LearningAreaResponse> {
    return this.http
      .get<ILearningArea[]>(`${this.resourceUrl}/learning-areas`, { observe: 'response' })
      .toPromise();
  }

  createBooking(booking: IBooking): Observable<BookingResponse> {
    return this.http.post<IBooking>(`${this.resourceUrl}/bookings`, booking, { observe: 'response' });
  }

  async getCurrentBooking(): Promise<BookingFullResponse> {
    return this.http
      .get<IBookingExtended>(`${this.resourceUrl}/bookings/active/current-user`, { observe: 'response' })
      .toPromise();
  }

  pauseABooking(id?: number): Observable<BookingResponse> {
    return this.http.put<any>(`${this.resourceUrl}/bookings/pause/${id}`, { observe: 'response' });
  }

  async getPausesOfCurrentUser(): Promise<UserHistoriesResponse> {
    return this.http
      .get<IUserHistory[]>(`${this.resourceUrl}/bookings/pauses-taken/current-user`, { observe: 'response' })
      .toPromise();
  }

  async deleteBooking(id?: number): Promise<BookingResponse> {
    return this.http
      .delete<any>(`${this.resourceUrl}/bookings/${id}`, { observe: 'response' })
      .toPromise();
  }

  async getLearningSpots(): Promise<LearningSpotsResponse> {
    return this.http
      .get<ILearningSpot[]>(`${this.resourceUrl}/learning-spots`, { observe: 'response' })
      .toPromise();
  }

  getTotalLearningDuration(id: number): Observable<NumberResponse> {
    return this.http.get<number>(`${this.resourceUrl}/user-histories/find-by-userId/${id}`, { observe: 'response' });
  }

  async getLearningDurationInDateRangePerDay(lowerDate: string, upperDate: string): Promise<NumbersResponse> {
    return this.http
      .get<number[]>(`${this.resourceUrl}/user-histories/find-by-date-range-per-day/${lowerDate}/${upperDate}`, {
        observe: 'response'
      })
      .toPromise();
  }

  async getLearningDurationInDateRangeTotal(lowerDate: string, upperDate: string): Promise<NumberResponse> {
    return this.http
      .get<number>(`${this.resourceUrl}/user-histories/find-by-date-range/${lowerDate}/${upperDate}`, {
        observe: 'response'
      })
      .toPromise();
  }

  async getSpecificLearningDay(date: string): Promise<NumberResponse> {
    return this.http
      .get<number>(`${this.resourceUrl}/user-histories/find-by-specific-day/${date}`, { observe: 'response' })
      .toPromise();
  }

  async getLearningDurationTodayForLearningSpot(learningSpotId: number, dayDate: string): Promise<NumberResponse> {
    return this.http
      .get<number>(`${this.resourceUrl}/spot-histories/find-by-specific-day/${dayDate}/spotId/${learningSpotId}`, { observe: 'response' })
      .toPromise();
  }

  async getLearningDurationForLearningSpotInDateRange(
    learningSpotId: number,
    lowerDate: string,
    upperDate: string
  ): Promise<NumberResponse> {
    return this.http
      .get<number>(`${this.resourceUrl}/spot-histories/find-by-date-range/${lowerDate}/${upperDate}/spotId/${learningSpotId}/`, {
        observe: 'response'
      })
      .toPromise();
  }

  async getLearningDurationForLearningSpotInDateRangePerDay(
    learningSpotId: number,
    lowerDate: string,
    upperDate: string
  ): Promise<NumbersResponse> {
    return this.http
      .get<number[]>(`${this.resourceUrl}/spot-histories/find-by-date-range-per-day/${lowerDate}/${upperDate}/spotId/${learningSpotId}/`, {
        observe: 'response'
      })
      .toPromise();
  }

  async getOccupancyToday(date: string): Promise<OccupanciesResponse> {
    return this.http
      .get<IOccupancyHistory[]>(`${this.resourceUrl}/occupancy-histories/find-by-specific-day/${date}/`, { observe: 'response' })
      .toPromise();
  }

  async getLearningSpotId(id: number): Promise<LearningSpotResponse> {
    return this.http
      .get<ILearningSpot>(`${this.resourceUrl}/learning-spots/${id}/`, { observe: 'response' })
      .toPromise();
  }

  update(learningSpot: ILearningSpot): Observable<LearningSpotResponse> {
    return this.http.put<ILearningSpot>(`${this.resourceUrl}/learning-spots/`, learningSpot, { observe: 'response' });
  }

  query(req?: any): Observable<LearningSpotsResponse> {
    const options = createRequestOption(req);
    return this.http.get<ILearningSpot[]>(`${this.resourceUrl}/learning-spots/`, { params: options, observe: 'response' });
  }

  async delete(id: number): Promise<LearningSpotResponse> {
    return this.http
      .delete<any>(`${this.resourceUrl}/learning-spots/${id}`, { observe: 'response' })
      .toPromise();
  }

  async getCurrentUserInformation(): Promise<UserResponse> {
    return this.http
      .get<IUser>(`${this.accountUrl}`, { observe: 'response' })
      .toPromise();
  }
}
