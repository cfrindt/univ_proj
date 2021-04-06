import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBooking } from 'app/shared/model/SmartParking/booking.model';

type EntityResponseType = HttpResponse<IBooking>;
type EntityArrayResponseType = HttpResponse<IBooking[]>;

@Injectable({ providedIn: 'root' })
export class BookingService {
  public resourceUrl = SERVER_API_URL + 'services/smartparking/api/bookings';

  constructor(protected http: HttpClient) {}

  create(booking: IBooking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(booking);
    return this.http
      .post<IBooking>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(booking: IBooking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(booking);
    return this.http
      .put<IBooking>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBooking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(booking: IBooking): IBooking {
    const copy: IBooking = Object.assign({}, booking, {
      startTime: booking.startTime && booking.startTime.isValid() ? booking.startTime.toJSON() : undefined,
      endTime: booking.endTime && booking.endTime.isValid() ? booking.endTime.toJSON() : undefined,
      reservationTime: booking.reservationTime && booking.reservationTime.isValid() ? booking.reservationTime.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startTime = res.body.startTime ? moment(res.body.startTime) : undefined;
      res.body.endTime = res.body.endTime ? moment(res.body.endTime) : undefined;
      res.body.reservationTime = res.body.reservationTime ? moment(res.body.reservationTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((booking: IBooking) => {
        booking.startTime = booking.startTime ? moment(booking.startTime) : undefined;
        booking.endTime = booking.endTime ? moment(booking.endTime) : undefined;
        booking.reservationTime = booking.reservationTime ? moment(booking.reservationTime) : undefined;
      });
    }
    return res;
  }
}
