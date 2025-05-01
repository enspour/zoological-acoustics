import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkTabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: MkTabsComponent;
  let fixture: ComponentFixture<MkTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
