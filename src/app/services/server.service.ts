import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server, ServerAdd } from '../models/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl ='https://localhost:7284/api/Server';
  urlRede = 'https://localhost:7284/api/Server/rede';

  constructor(public http: HttpClient) { }

  public getServer(): Observable<Server[]> {
    return this.http.get<Server[]>(this.baseUrl);
  }

  public getServerById(id: number): Observable<Server> {
    return this.http.get<Server>(`${this.baseUrl}/${id}`);
  }

  public getServerByRede(rede: string): Observable<Server[]> {
    return this.http.get<Server[]>(`${this.urlRede}/${rede}`);
  }

  public Add(server: ServerAdd): Observable<Server> {
    return this.http.post<Server>(this.baseUrl, server);
  }

  public Delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public UpdateServer(server: Server): Observable<any>{
    console.log("Undefined: ", server.id);
    return this.http.put(`${this.baseUrl}/${server.id}`, server);
  }

}
