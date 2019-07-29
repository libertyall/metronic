import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDashboardComponent } from './location-dashboard.component';

describe('LocationDashboardComponent', () => {
  let component: LocationDashboardComponent;
  let fixture: ComponentFixture<LocationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
