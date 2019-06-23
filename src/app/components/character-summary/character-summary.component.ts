import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  CharacterService
} from '../../services/character';

import {
  filter
} from 'rxjs/operators';

@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html',
  styleUrls: ['./character-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSummaryComponent implements OnInit {

  constructor(
    public characterService: CharacterService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Update change detection when the character object changes
    this.characterService.characterUpdated$.pipe(
      filter(value => value !== null)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

}
