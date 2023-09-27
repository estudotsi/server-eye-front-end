import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/appplication';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl ='https://localhost:7284/api/App';

  constructor(public http: HttpClient) { }

  public getApp(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl);
  }

  public Add(app: Application): Observable<Application> {
    return this.http.post<Application>(this.baseUrl, app);
  }
}
