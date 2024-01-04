import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsDetailComponent } from './vendors-detail.component';

describe('VendorsDetailComponent', () => {
  let component: VendorsDetailComponent;
  let fixture: ComponentFixture<VendorsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorsDetailComponent]
    });
    fixture = TestBed.createComponent(VendorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
