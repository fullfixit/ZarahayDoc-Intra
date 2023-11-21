import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NidDoctorantComponent } from './nid-doctorant.component';

describe('NidDoctorantComponent', () => {
  let component: NidDoctorantComponent;
  let fixture: ComponentFixture<NidDoctorantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NidDoctorantComponent]
    });
    fixture = TestBed.createComponent(NidDoctorantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
