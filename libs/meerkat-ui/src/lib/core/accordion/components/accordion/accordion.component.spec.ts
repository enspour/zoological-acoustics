import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkAccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: MkAccordionComponent;
  let fixture: ComponentFixture<MkAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
