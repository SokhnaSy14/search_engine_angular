import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVEL_URL, config } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Profil {
  id: number;
  label: string;
  required: any;
  optional: any;
}

export let counterID = 1;
export let profilArray: Profil[] = [];

export function handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  constructor(private logger: LoggerService, private http: HttpClient) {}

  private profil_array = new BehaviorSubject([]);

  profils = this.profil_array.asObservable();

  setResult(value: any): void {
    this.profil_array.next(value);
  }

  getProfils(): Observable<Profil[]> {
    return this.http
      .get<Profil[]>(SERVEL_URL + 'profil')
      .pipe(catchError(handleError<Profil[]>('getProfils', [])));
  }

  addProfil(profil: Profil): Observable<Profil> {
    let p: Profil;
    this.http
      .post<Profil>(SERVEL_URL + 'profil', profil, config)
      .pipe(catchError(handleError<Profil[]>('addProfil', [])))
      .subscribe((data) => {
        p = Object.assign({}, profil, data);
        profilArray.push(profil);
      });
    return of(p);
  }

  updateProfil(profil: Profil): Observable<Profil> {
    return this.http
      .put<Profil>(SERVEL_URL + 'profil', profil, config)
      .pipe(catchError(handleError<Profil>('addProfil')));
  }

  deleteProfil(id: string): Observable<Profil> {
    return this.http
      .delete<Profil>(`${SERVEL_URL}profil/${id}`, config)
      .pipe(catchError(handleError<Profil>('deleteProfil')));
  }

  getProfilLabel(): void {
    let labels = [];

    this.getProfils().subscribe((data) => {
      profilArray = data;
      data.map((p) => {
        labels.push(p.label);
      });
    });

    this.setResult(labels);
  }
}
