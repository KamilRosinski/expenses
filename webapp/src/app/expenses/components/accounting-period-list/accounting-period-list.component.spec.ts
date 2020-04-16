import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPeriodListComponent } from './accounting-period-list.component';

describe('AccountingPeriodListComponent', () => {
  let component: AccountingPeriodListComponent;
  let fixture: ComponentFixture<AccountingPeriodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingPeriodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
