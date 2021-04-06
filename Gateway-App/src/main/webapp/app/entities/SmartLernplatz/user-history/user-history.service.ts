import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserHistory } from 'app/shared/model/SmartLernplatz/user-history.model';

type EntityResponseType = HttpResponse<IUserHistory>;
type EntityArrayResponseType = HttpResponse<IUserHistory[]>;

@Injectable({ providedIn: 'root' })
export class UserHistoryService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/user-histories';

  constructor(protected http: HttpClient) {}

  create(userHistory: IUserHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userHistory);
    return this.http
      .post<IUserHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userHistory: IUserHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userHistory);
    return this.http
      .put<IUserHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userHistory: IUserHistory): IUserHistory {
    const copy: IUserHistory = Object.assign({}, userHistory, {
      pauseStartStamp:
        userHistory.pauseStartStamp && userHistory.pauseStartStamp.isValid() ? userHistory.pauseStartStamp.toJSON() : undefined,
      pauseEndStamp: userHistory.pauseEndStamp && userHistory.pauseEndStamp.isValid() ? userHistory.pauseEndStamp.toJSON() : undefined,
      bookingStartStamp:
        userHistory.bookingStartStamp && userHistory.bookingStartStamp.isValid() ? userHistory.bookingStartStamp.toJSON() : undefined,
      bookingEndStamp:
        userHistory.bookingEndStamp && userHistory.bookingEndStamp.isValid() ? userHistory.bookingEndStamp.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.pauseStartStamp = res.body.pauseStartStamp ? moment(res.body.pauseStartStamp) : undefined;
      res.body.pauseEndStamp = res.body.pauseEndStamp ? moment(res.body.pauseEndStamp) : undefined;
      res.body.bookingStartStamp = res.body.bookingStartStamp ? moment(res.body.bookingStartStamp) : undefined;
      res.body.bookingEndStamp = res.body.bookingEndStamp ? moment(res.body.bookingEndStamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userHistory: IUserHistory) => {
        userHistory.pauseStartStamp = userHistory.pauseStartStamp ? moment(userHistory.pauseStartStamp) : undefined;
        userHistory.pauseEndStamp = userHistory.pauseEndStamp ? moment(userHistory.pauseEndStamp) : undefined;
        userHistory.bookingStartStamp = userHistory.bookingStartStamp ? moment(userHistory.bookingStartStamp) : undefined;
        userHistory.bookingEndStamp = userHistory.bookingEndStamp ? moment(userHistory.bookingEndStamp) : undefined;
      });
    }
    return res;
  }
}
