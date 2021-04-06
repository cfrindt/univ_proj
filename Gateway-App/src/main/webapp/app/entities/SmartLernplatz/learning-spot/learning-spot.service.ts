import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILearningSpot } from 'app/shared/model/SmartLernplatz/learning-spot.model';

type EntityResponseType = HttpResponse<ILearningSpot>;
type EntityArrayResponseType = HttpResponse<ILearningSpot[]>;

@Injectable({ providedIn: 'root' })
export class LearningSpotService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/learning-spots';

  constructor(protected http: HttpClient) {}

  create(learningSpot: ILearningSpot): Observable<EntityResponseType> {
    return this.http.post<ILearningSpot>(this.resourceUrl, learningSpot, { observe: 'response' });
  }

  update(learningSpot: ILearningSpot): Observable<EntityResponseType> {
    return this.http.put<ILearningSpot>(this.resourceUrl, learningSpot, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILearningSpot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILearningSpot[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
