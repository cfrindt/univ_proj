import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParkingFacility } from 'app/shared/model/SmartParking/parking-facility.model';

type EntityResponseType = HttpResponse<IParkingFacility>;
type EntityArrayResponseType = HttpResponse<IParkingFacility[]>;

@Injectable({ providedIn: 'root' })
export class ParkingFacilityService {
  public resourceUrl = SERVER_API_URL + 'services/smartparking/api/parking-facilities';

  constructor(protected http: HttpClient) {}

  create(parkingFacility: IParkingFacility): Observable<EntityResponseType> {
    return this.http.post<IParkingFacility>(this.resourceUrl, parkingFacility, { observe: 'response' });
  }

  update(parkingFacility: IParkingFacility): Observable<EntityResponseType> {
    return this.http.put<IParkingFacility>(this.resourceUrl, parkingFacility, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParkingFacility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParkingFacility[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
