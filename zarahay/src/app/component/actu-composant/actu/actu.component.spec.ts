import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuComponent } from './actu.component';

describe('ActuComponent', () => {
  let component: ActuComponent;
  let fixture: ComponentFixture<ActuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActuComponent]
    });
    fixture = TestBed.createComponent(ActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
