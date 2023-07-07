import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Db } from '../models/db';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  baseUrl ='https://localhost:7284/api/Db';

  constructor(public http: HttpClient) { }

  public getDb(): Observable<Db[]> {
    return this.http.get<Db[]>(this.baseUrl);
  }

}

