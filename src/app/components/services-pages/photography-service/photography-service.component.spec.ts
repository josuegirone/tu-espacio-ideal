import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyServiceComponent } from './photography-service.component';

describe('PhotographyServiceComponent', () => {
  let component: PhotographyServiceComponent;
  let fixture: ComponentFixture<PhotographyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographyServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
