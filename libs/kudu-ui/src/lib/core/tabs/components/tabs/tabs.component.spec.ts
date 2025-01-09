import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: KuduTabsComponent;
  let fixture: ComponentFixture<KuduTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
