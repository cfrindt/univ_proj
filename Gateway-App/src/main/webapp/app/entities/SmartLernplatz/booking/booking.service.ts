import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBooking } from 'app/shared/model/SmartLernplatz/booking.model';

type EntityResponseType = HttpResponse<IBooking>;
type EntityArrayResponseType = HttpResponse<IBooking[]>;

@Injectable({ providedIn: 'root' })
export class BookingService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/bookings';

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
      bookingStartStamp: booking.bookingStartStamp && booking.bookingStartStamp.isValid() ? booking.bookingStartStamp.toJSON() : undefined,
      bookingEndStamp: booking.bookingEndStamp && booking.bookingEndStamp.isValid() ? booking.bookingEndStamp.toJSON() : undefined,
      pauseStartStamp: booking.pauseStartStamp && booking.pauseStartStamp.isValid() ? booking.pauseStartStamp.toJSON() : undefined,
      pauseEndStamp: booking.pauseEndStamp && booking.pauseEndStamp.isValid() ? booking.pauseEndStamp.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.bookingStartStamp = res.body.bookingStartStamp ? moment(res.body.bookingStartStamp) : undefined;
      res.body.bookingEndStamp = res.body.bookingEndStamp ? moment(res.body.bookingEndStamp) : undefined;
      res.body.pauseStartStamp = res.body.pauseStartStamp ? moment(res.body.pauseStartStamp) : undefined;
      res.body.pauseEndStamp = res.body.pauseEndStamp ? moment(res.body.pauseEndStamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((booking: IBooking) => {
        booking.bookingStartStamp = booking.bookingStartStamp ? moment(booking.bookingStartStamp) : undefined;
        booking.bookingEndStamp = booking.bookingEndStamp ? moment(booking.bookingEndStamp) : undefined;
        booking.pauseStartStamp = booking.pauseStartStamp ? moment(booking.pauseStartStamp) : undefined;
        booking.pauseEndStamp = booking.pauseEndStamp ? moment(booking.pauseEndStamp) : undefined;
      });
    }
    return res;
  }
}
