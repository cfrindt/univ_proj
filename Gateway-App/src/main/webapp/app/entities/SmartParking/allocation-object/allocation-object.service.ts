import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAllocationObject } from 'app/shared/model/SmartParking/allocation-object.model';

type EntityResponseType = HttpResponse<IAllocationObject>;
type EntityArrayResponseType = HttpResponse<IAllocationObject[]>;

@Injectable({ providedIn: 'root' })
export class AllocationObjectService {
  public resourceUrl = SERVER_API_URL + 'services/smartparking/api/allocation-objects';

  constructor(protected http: HttpClient) {}

  create(allocationObject: IAllocationObject): Observable<EntityResponseType> {
    return this.http.post<IAllocationObject>(this.resourceUrl, allocationObject, { observe: 'response' });
  }

  update(allocationObject: IAllocationObject): Observable<EntityResponseType> {
    return this.http.put<IAllocationObject>(this.resourceUrl, allocationObject, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAllocationObject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAllocationObject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
