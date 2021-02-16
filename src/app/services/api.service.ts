import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, switchMap, catchError, map } from "rxjs/operators";
import { fromFetch } from 'rxjs/fetch';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {

  private data$: BehaviorSubject<object> = new BehaviorSubject({});
  private results$: BehaviorSubject<number> = new BehaviorSubject(0);

  //[{},{}]

  get data(): Observable<object> {
    return this.data$.asObservable();
  }


  constructor(private http: HttpClient){
    
  }

  requestData(query: string) {
    this.http.get(`https://api.github.com/search/repositories?q=${query}`).pipe(
      catchError(err => {
        return of({ error: true, message: err.message })
      })
    ).subscribe(r => this.data$.next(r))

  }
}
