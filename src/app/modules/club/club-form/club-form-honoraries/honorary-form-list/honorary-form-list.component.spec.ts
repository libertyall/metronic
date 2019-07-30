import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoraryFormListComponent } from './honorary-form-list.component';

describe('HonoraryFormListComponent', () => {
  let component: HonoraryFormListComponent;
  let fixture: ComponentFixture<HonoraryFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HonoraryFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoraryFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
