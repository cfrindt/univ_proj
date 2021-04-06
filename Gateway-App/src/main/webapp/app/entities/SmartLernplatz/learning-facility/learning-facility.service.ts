import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILearningFacility } from 'app/shared/model/SmartLernplatz/learning-facility.model';

type EntityResponseType = HttpResponse<ILearningFacility>;
type EntityArrayResponseType = HttpResponse<ILearningFacility[]>;

@Injectable({ providedIn: 'root' })
export class LearningFacilityService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/learning-facilities';

  constructor(protected http: HttpClient) {}

  create(learningFacility: ILearningFacility): Observable<EntityResponseType> {
    return this.http.post<ILearningFacility>(this.resourceUrl, learningFacility, { observe: 'response' });
  }

  update(learningFacility: ILearningFacility): Observable<EntityResponseType> {
    return this.http.put<ILearningFacility>(this.resourceUrl, learningFacility, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILearningFacility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILearningFacility[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
