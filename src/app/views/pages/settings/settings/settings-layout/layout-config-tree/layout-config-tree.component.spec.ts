import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConfigTreeComponent } from './layout-config-tree.component';

describe('LayoutConfigTreeComponent', () => {
  let component: LayoutConfigTreeComponent;
  let fixture: ComponentFixture<LayoutConfigTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutConfigTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutConfigTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
