import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParkingArea } from 'app/shared/model/SmartParking/parking-area.model';

type EntityResponseType = HttpResponse<IParkingArea>;
type EntityArrayResponseType = HttpResponse<IParkingArea[]>;

@Injectable({ providedIn: 'root' })
export class ParkingAreaService {
  public resourceUrl = SERVER_API_URL + 'services/smartparking/api/parking-areas';

  constructor(protected http: HttpClient) {}

  create(parkingArea: IParkingArea): Observable<EntityResponseType> {
    return this.http.post<IParkingArea>(this.resourceUrl, parkingArea, { observe: 'response' });
  }

  update(parkingArea: IParkingArea): Observable<EntityResponseType> {
    return this.http.put<IParkingArea>(this.resourceUrl, parkingArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParkingArea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParkingArea[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAllParkingAreasOfFacility(id: number): Observable<EntityArrayResponseType>{
    return this.http.get<IParkingArea[]>(`${this.resourceUrl}-in-parking-facility/${id}`, {observe: 'response'});
  }
}
