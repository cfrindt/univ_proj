import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILearningArea } from 'app/shared/model/SmartLernplatz/learning-area.model';

type EntityResponseType = HttpResponse<ILearningArea>;
type EntityArrayResponseType = HttpResponse<ILearningArea[]>;

@Injectable({ providedIn: 'root' })
export class LearningAreaService {
  public resourceUrl = SERVER_API_URL + 'services/smartlernplatz/api/learning-areas';

  constructor(protected http: HttpClient) {}

  create(learningArea: ILearningArea): Observable<EntityResponseType> {
    return this.http.post<ILearningArea>(this.resourceUrl, learningArea, { observe: 'response' });
  }

  update(learningArea: ILearningArea): Observable<EntityResponseType> {
    return this.http.put<ILearningArea>(this.resourceUrl, learningArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILearningArea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILearningArea[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
