import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AunthenticationComponent } from './aunthentication.component';

describe('AunthenticationComponent', () => {
  let component: AunthenticationComponent;
  let fixture: ComponentFixture<AunthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AunthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AunthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
