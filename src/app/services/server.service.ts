import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from '../models/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl ='https://localhost:7284/api/Server';

  constructor(public http: HttpClient) { }

  public getServer(): Observable<Server[]> {
    return this.http.get<Server[]>(this.baseUrl);
  }

  public getServerById(id: number): Observable<Server> {
    return this.http.get<Server>(`${this.baseUrl}/${id}`);
  }
}
