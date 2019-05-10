import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConfigItemComponent } from './layout-config-item.component';

describe('LayoutConfigItemComponent', () => {
  let component: LayoutConfigItemComponent;
  let fixture: ComponentFixture<LayoutConfigItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutConfigItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutConfigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
