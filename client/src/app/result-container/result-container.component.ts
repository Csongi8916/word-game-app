import { Component, Input, OnInit } from '@angular/core';
import { WordGameService } from 'src/core/word-game.service';
import { Result } from 'src/types.model';

@Component({
  selector: 'lp-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss']
})
export class ResultContainerComponent implements OnInit {

  @Input() actualWord: string;
  results: string[] = [];
  isEmpty: boolean = false;
  isAlreadyUsed: boolean = false;

  constructor(private wordGameService: WordGameService) { }

  ngOnInit(): void {
    this.wordGameService.moveResultEmitter$.subscribe((results: Result) => {
      this.isEmpty = results.words.length === 0 ? true : false;
      this.isAlreadyUsed = true;
      if (this.actualWord !== results.actualWord) {
        this.actualWord = results.actualWord;
        this.results = results.words;
      }
    });
  }
}
