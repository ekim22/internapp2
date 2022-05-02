import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItecComponent } from './itec.component';

describe('ItecComponent', () => {
  let component: ItecComponent;
  let fixture: ComponentFixture<ItecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
