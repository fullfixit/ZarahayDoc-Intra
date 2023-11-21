import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifComponent } from './notif.component';

describe('NotifComponent', () => {
  let component: NotifComponent;
  let fixture: ComponentFixture<NotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotifComponent]
    });
    fixture = TestBed.createComponent(NotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
