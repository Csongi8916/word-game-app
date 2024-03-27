import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordGameService } from 'src/core/word-game.service';
import { Result } from 'src/types.model';

@Component({
  selector: 'lp-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss']
})
export class ResultContainerComponent implements OnInit, OnDestroy {

  @Input() actualWord: string;

  private resultSub: Subscription;
  results: string[] = [];
  isEmpty: boolean = false;
  isAlreadyUsed: boolean = false;

  constructor(private wordGameService: WordGameService) { }

  ngOnInit(): void {
    this.resultSub = this.wordGameService.moveResultEmitter$.subscribe((results: Result) => {
      this.isEmpty = results.words.length === 0 ? true : false;
      this.isAlreadyUsed = true;
      this.results = results.words;
    });
  }

  ngOnDestroy(): void {
    this.resultSub.unsubscribe();
  }
}
