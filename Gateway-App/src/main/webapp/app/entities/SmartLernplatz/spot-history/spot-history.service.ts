import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpotHistory } from 'app/shared/model/SmartLernplatz/spot-history.model';

type EntityResponseType = HttpResponse<ISpotHistory>;
type EntityArrayResponseType = HttpResponse<ISpotHistory[]>;

@Injectable({ providedIn: 'root' })
export class SpotHistoryService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/spot-histories';

  constructor(protected http: HttpClient) {}

  create(spotHistory: ISpotHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spotHistory);
    return this.http
      .post<ISpotHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(spotHistory: ISpotHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spotHistory);
    return this.http
      .put<ISpotHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISpotHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISpotHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(spotHistory: ISpotHistory): ISpotHistory {
    const copy: ISpotHistory = Object.assign({}, spotHistory, {
      bookingStartStamp:
        spotHistory.bookingStartStamp && spotHistory.bookingStartStamp.isValid() ? spotHistory.bookingStartStamp.toJSON() : undefined,
      bookingEndStamp:
        spotHistory.bookingEndStamp && spotHistory.bookingEndStamp.isValid() ? spotHistory.bookingEndStamp.toJSON() : undefined,
      pauseStartStamp:
        spotHistory.pauseStartStamp && spotHistory.pauseStartStamp.isValid() ? spotHistory.pauseStartStamp.toJSON() : undefined,
      pauseEndStamp: spotHistory.pauseEndStamp && spotHistory.pauseEndStamp.isValid() ? spotHistory.pauseEndStamp.toJSON() : undefined
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
      res.body.forEach((spotHistory: ISpotHistory) => {
        spotHistory.bookingStartStamp = spotHistory.bookingStartStamp ? moment(spotHistory.bookingStartStamp) : undefined;
        spotHistory.bookingEndStamp = spotHistory.bookingEndStamp ? moment(spotHistory.bookingEndStamp) : undefined;
        spotHistory.pauseStartStamp = spotHistory.pauseStartStamp ? moment(spotHistory.pauseStartStamp) : undefined;
        spotHistory.pauseEndStamp = spotHistory.pauseEndStamp ? moment(spotHistory.pauseEndStamp) : undefined;
      });
    }
    return res;
  }
}
