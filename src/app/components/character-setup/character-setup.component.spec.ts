import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSetupComponent } from './character-setup.component';

describe('CharacterSetupComponent', () => {
  let component: CharacterSetupComponent;
  let fixture: ComponentFixture<CharacterSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
