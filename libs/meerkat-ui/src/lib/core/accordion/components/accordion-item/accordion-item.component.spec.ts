import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkAccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let component: MkAccordionItemComponent;
  let fixture: ComponentFixture<MkAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkAccordionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
