import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioHomeComponent } from './bio-home.component';

describe('BioHomeComponent', () => {
  let component: BioHomeComponent;
  let fixture: ComponentFixture<BioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
