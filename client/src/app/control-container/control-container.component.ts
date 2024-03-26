import { WordGameService } from './../../core/word-game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lp-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss']
})
export class ControlContainerComponent implements OnInit {

  wordGameForm: FormGroup;

  constructor(private wordGameService: WordGameService) { }
  
  ngOnInit(): void {
    this.wordGameForm = new FormGroup({
      word: new FormControl(null, [Validators.min(5), Validators.max(5)]),
    });
  }

  onSubmit(): void {
    const word = this.wordGameForm.get('word')?.value;
    const anagram = this.wordGameService.getAnagrams(word);
    alert(anagram);
  }

}