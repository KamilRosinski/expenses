import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountingPeriodComponent } from './create-accounting-period.component';

describe('CreateAccountingPeriodComponent', () => {
  let component: CreateAccountingPeriodComponent;
  let fixture: ComponentFixture<CreateAccountingPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountingPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
