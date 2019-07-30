import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronjobsComponent } from './cronjobs.component';

describe('CronjobsComponent', () => {
  let component: CronjobsComponent;
  let fixture: ComponentFixture<CronjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
