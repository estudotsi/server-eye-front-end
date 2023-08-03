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

  public SearchImage(nomeArquivo: string): any{
    return this.http.get(`${this.baseUrl}/searchFile?imagemUrl=${nomeArquivo}`)
  }

  postUpload(file: File): Observable<Os> {
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Os>(`${this.baseUrl}/upload-image`, formData)
      .pipe(take(1));
  }

  postUploadUpdate(file: File, name: string): Observable<Os> {
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Os>(`${this.baseUrl}/upload-image-up?nameFile=${name}`, formData)
      .pipe(take(1));
  }

}
