import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParkingSpot } from 'app/shared/model/SmartParking/parking-spot.model';

type EntityResponseType = HttpResponse<IParkingSpot>;
type EntityArrayResponseType = HttpResponse<IParkingSpot[]>;

@Injectable({ providedIn: 'root' })
export class ParkingSpotService {
  public resourceUrl = SERVER_API_URL + 'services/smartparking/api/parking-spots';

  constructor(protected http: HttpClient) {}

  create(parkingSpot: IParkingSpot): Observable<EntityResponseType> {
    return this.http.post<IParkingSpot>(this.resourceUrl, parkingSpot, { observe: 'response' });
  }

  update(parkingSpot: IParkingSpot): Observable<EntityResponseType> {
    return this.http.put<IParkingSpot>(this.resourceUrl, parkingSpot, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParkingSpot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParkingSpot[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
