import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCreatorSectionComponent } from './info-creator-section.component';

describe('InfoCreatorSectionComponent', () => {
  let component: InfoCreatorSectionComponent;
  let fixture: ComponentFixture<InfoCreatorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCreatorSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCreatorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
