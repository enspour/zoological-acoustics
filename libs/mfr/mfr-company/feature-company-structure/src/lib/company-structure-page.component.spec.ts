import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyStructurePageComponent } from './company-structure-page.component';

describe('CompanyStructurePageComponent', () => {
  let component: CompanyStructurePageComponent;
  let fixture: ComponentFixture<CompanyStructurePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyStructurePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyStructurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
