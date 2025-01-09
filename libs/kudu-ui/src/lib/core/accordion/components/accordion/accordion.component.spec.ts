import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduAccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: KuduAccordionComponent;
  let fixture: ComponentFixture<KuduAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
