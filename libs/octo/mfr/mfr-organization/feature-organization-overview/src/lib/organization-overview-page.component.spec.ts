import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationOverviewPageComponent } from './organization-overview-page.component';

describe('CompanyPageComponent', () => {
  let component: OrganizationOverviewPageComponent;
  let fixture: ComponentFixture<OrganizationOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
