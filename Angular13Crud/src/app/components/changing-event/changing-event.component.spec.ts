import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingEventComponent } from './changing-event.component';

describe('ChangingEventComponent', () => {
  let component: ChangingEventComponent;
  let fixture: ComponentFixture<ChangingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangingEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
