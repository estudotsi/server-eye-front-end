import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Os } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl ='https://localhost:7284/api/Os';

  constructor(public http: HttpClient) { }

  public GetOs(): Observable<Os[]> {
    return this.http.get<Os[]>(this.baseUrl);
  }

  public Add(os: Os): Observable<Os> {
    return this.http.post<Os>(this.baseUrl, os);
  }

  public Delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public GetOsById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  public UpdateOs(os: Os): Observable<any>{
    return this.http.put(`${this.baseUrl}/${os.id}`, os);
  }

}
