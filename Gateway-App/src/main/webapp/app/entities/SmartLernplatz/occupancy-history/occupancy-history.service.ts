import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOccupancyHistory } from 'app/shared/model/SmartLernplatz/occupancy-history.model';

type EntityResponseType = HttpResponse<IOccupancyHistory>;
type EntityArrayResponseType = HttpResponse<IOccupancyHistory[]>;

@Injectable({ providedIn: 'root' })
export class OccupancyHistoryService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/occupancy-histories';

  constructor(protected http: HttpClient) {}

  create(occupancyHistory: IOccupancyHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(occupancyHistory);
    return this.http
      .post<IOccupancyHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(occupancyHistory: IOccupancyHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(occupancyHistory);
    return this.http
      .put<IOccupancyHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOccupancyHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOccupancyHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(occupancyHistory: IOccupancyHistory): IOccupancyHistory {
    const copy: IOccupancyHistory = Object.assign({}, occupancyHistory, {
      timeStamp: occupancyHistory.timeStamp && occupancyHistory.timeStamp.isValid() ? occupancyHistory.timeStamp.toJSON() : undefined,
      localDateStamp:
        occupancyHistory.localDateStamp && occupancyHistory.localDateStamp.isValid()
          ? occupancyHistory.localDateStamp.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timeStamp = res.body.timeStamp ? moment(res.body.timeStamp) : undefined;
      res.body.localDateStamp = res.body.localDateStamp ? moment(res.body.localDateStamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((occupancyHistory: IOccupancyHistory) => {
        occupancyHistory.timeStamp = occupancyHistory.timeStamp ? moment(occupancyHistory.timeStamp) : undefined;
        occupancyHistory.localDateStamp = occupancyHistory.localDateStamp ? moment(occupancyHistory.localDateStamp) : undefined;
      });
    }
    return res;
  }
}
