import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WordGameService } from './../../core/word-game.service';

@Component({
  selector: 'lp-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss']
})
export class ControlContainerComponent implements OnInit {

  @Input() title: string;
  @Input() isNeedDest: boolean;

  wordGameForm: FormGroup;
  anagramWord: string = '';
  actualSrcWord: string = '';
  actualDestWord: string = '';
  anagrams: string[] = [];
  wordChains: string[] = [];

  constructor(private wordGameService: WordGameService) { }
  
  ngOnInit(): void {
    this.wordGameForm = new FormGroup({
      anagramWord: new FormControl(null, [Validators.min(5), Validators.max(5)]),
      sourceWord: new FormControl(null, [Validators.min(5), Validators.max(5)]),
      destWord: new FormControl(null, [Validators.min(5), Validators.max(5)]),
    });
  }

  onSubmit(): void {
    if (!this.isNeedDest) {
      this.getAnagrams();
    }
    else if (this.isNeedDest) {
      this.getWordChaines();
    }
  }

  getAnagrams() {
    this.anagramWord = this.wordGameForm.get('anagramWord')?.value;
    this.wordGameService.getAnagrams(this.anagramWord).subscribe((res: any) => {
      this.anagrams = res.body.anagrams;
      this.wordGameService.moveResults({ source: this.anagramWord, words: this.anagrams });
    });
  }

  getWordChaines() {
    this.actualSrcWord = this.wordGameForm.get('sourceWord')?.value;
    this.actualDestWord = this.wordGameForm.get('destWord')?.value;
    this.wordGameService.getWordChaines(this.actualSrcWord, this.actualDestWord).subscribe((res: any) => {
      this.wordChains = res.body.wordChaines;
      this.wordGameService.moveResults({ source: this.actualSrcWord, target: this.actualDestWord, words: this.wordChains });
    });
  }


}
