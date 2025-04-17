import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyOverviewPageComponent } from './company-overview-page.component';

describe('CompanyPageComponent', () => {
  let component: CompanyOverviewPageComponent;
  let fixture: ComponentFixture<CompanyOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
