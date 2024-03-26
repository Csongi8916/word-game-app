import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Result } from '../types.model';

@Injectable({
  providedIn: 'root'
})
export class WordGameService {

  constructor(private http: HttpClient) { }

  moveResultEmitter$ = new Subject<Result>()

  getAnagrams(word: string): Observable<HttpResponse<string>> {
    const postData = { content: word };
    return this.http.post<string>('http://localhost:3000/anagram/',
    postData,
    {
      observe: 'response'
    })
  }

  moveResults(results: Result) {
    this.moveResultEmitter$.next(results);
  }
}
