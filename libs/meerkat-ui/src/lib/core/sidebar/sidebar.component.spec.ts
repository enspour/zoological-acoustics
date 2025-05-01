import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkSidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: MkSidebarComponent;
  let fixture: ComponentFixture<MkSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
