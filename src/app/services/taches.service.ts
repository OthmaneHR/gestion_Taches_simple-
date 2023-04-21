import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Tachess } from '../models/tachess';

@Injectable({
  providedIn: 'root'
})
export class TachesService {

  //apiUrl="http://localhost:3000/taches";
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Tachess[]>(this.apiUrl);
  }
  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  enregister(tachesAj: any){
    return this.http.post<Tachess>(this.apiUrl,tachesAj);
  }

  funcCompleted(id: any,completedval:boolean){
    return this.http.patch(`${this.apiUrl}/${id}`,{completed:!completedval});
  }

  updateTachesr(tachesUpdt:Tachess){
  return this.http.put(`${this.apiUrl}/${tachesUpdt.id}`,tachesUpdt)
  }
  }
