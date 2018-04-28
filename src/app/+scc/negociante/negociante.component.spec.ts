import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocianteComponent } from './negociante.component';

describe('NegocianteComponent', () => {
  let component: NegocianteComponent;
  let fixture: ComponentFixture<NegocianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegocianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
