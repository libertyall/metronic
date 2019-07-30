import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoraryFormComponent } from './honorary-form.component';

describe('HonoraryFormComponent', () => {
  let component: HonoraryFormComponent;
  let fixture: ComponentFixture<HonoraryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HonoraryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
