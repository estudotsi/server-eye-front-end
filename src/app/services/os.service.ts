import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Os } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl ='https://localhost:7284/api/Os';

  constructor(public http: HttpClient) { }

  public getOs(): Observable<Os[]> {
    return this.http.get<Os[]>(this.baseUrl);
  }

}
