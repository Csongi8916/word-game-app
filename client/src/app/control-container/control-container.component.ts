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
  @Input() neededTarget: boolean;

  wordGameForm: FormGroup;
  anagramWord: string = '';
  sourceWord: string = '';
  targetWord: string = '';
  anagrams: string[] = [];
  wordChains: string[] = [];

  constructor(private wordGameService: WordGameService) { }
  
  ngOnInit(): void {
    this.wordGameForm = new FormGroup({
      anagramWord: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      sourceWord: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(5)]),
      targetWord: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(5)]),
    });
  }

  onSubmit(): void {
    if (!this.isValidForm()) return;
    if (!this.neededTarget) {
      this.getAnagrams();
    }
    else if (this.neededTarget) {
      this.getWordChaines();
    }
    this.wordGameForm.reset();
  }

  getAnagrams() {
    this.anagramWord = this.wordGameForm.get('anagramWord')?.value;
    this.wordGameService.getAnagrams(this.anagramWord).subscribe((res: any) => {
      this.anagrams = res.body.anagrams;
      this.wordGameService.moveResults({ source: this.anagramWord, words: this.anagrams });
    });
  }

  getWordChaines() {
    this.sourceWord = this.wordGameForm.get('sourceWord')?.value;
    this.targetWord = this.wordGameForm.get('targetWord')?.value;
    this.wordGameService.getWordChaines(this.sourceWord, this.targetWord).subscribe((res: any) => {
      this.wordChains = res.body.wordChaines;
      this.wordGameService.moveResults({ source: this.sourceWord, target: this.targetWord, words: this.wordChains });
    });
  }

  isValidForm() {
    return this.wordGameForm.get('anagramWord').valid || this.neededTarget;
  }


}
