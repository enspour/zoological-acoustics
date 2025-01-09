import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduAccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let component: KuduAccordionItemComponent;
  let fixture: ComponentFixture<KuduAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduAccordionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
