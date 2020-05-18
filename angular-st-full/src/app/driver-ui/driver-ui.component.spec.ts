import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverUiComponent } from './driver-ui.component';

describe('DriverUiComponent', () => {
  let component: DriverUiComponent;
  let fixture: ComponentFixture<DriverUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
