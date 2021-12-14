import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItecHomeComponent } from './itec-home.component';

describe('ItecHomeComponent', () => {
  let component: ItecHomeComponent;
  let fixture: ComponentFixture<ItecHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItecHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItecHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
