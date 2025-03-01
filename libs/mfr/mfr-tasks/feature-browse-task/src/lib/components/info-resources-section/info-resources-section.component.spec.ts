import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoResourcesSectionComponent } from './info-resources-section.component';

describe('InfoResourcesSectionComponent', () => {
  let component: InfoResourcesSectionComponent;
  let fixture: ComponentFixture<InfoResourcesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoResourcesSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoResourcesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
