import { ComponentFixture, TestBed } from '@angular/core/testing';



import { RemodelaServiceComponent } from './remodela-service.component';

describe('RemodelaServiceComponent', () => {
  let component: RemodelaServiceComponent;
  let fixture: ComponentFixture<RemodelaServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemodelaServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemodelaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
