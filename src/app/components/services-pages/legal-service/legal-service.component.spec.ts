import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalServiceComponent } from './legal-service.component';

describe('LegalServiceComponent', () => {
  let component: LegalServiceComponent;
  let fixture: ComponentFixture<LegalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
