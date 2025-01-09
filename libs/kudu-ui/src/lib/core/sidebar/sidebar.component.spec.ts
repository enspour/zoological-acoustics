import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduSidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: KuduSidebarComponent;
  let fixture: ComponentFixture<KuduSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
