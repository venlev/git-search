import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, switchMap, catchError } from "rxjs/operators";
import { fromFetch } from 'rxjs/fetch';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {

  private data$: BehaviorSubject<object> = new BehaviorSubject({});
  private results$: BehaviorSubject<number> = new BehaviorSubject(0);

  get result(): Observable<object> {
    return this.data$.asObservable();
  }

  requestData(query: string) {

    const requests$ = fromFetch(`https://api.github.com/search/repositories?q=${query}`).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        return of({ error: true, message: err.message })
      })
    );

    requests$.subscribe(dat => {
      this.data$.next(dat);
      console.log(dat)
    })
  }
}
