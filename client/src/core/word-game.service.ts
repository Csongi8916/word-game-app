import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordGameService {

  constructor(private http: HttpClient) { }

  getAnagrams(word: string) {
    this.http.get('http://localhost:3000/test/' + word).subscribe((res: any) => {
      res.json();
    });
  }
}
