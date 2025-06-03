import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorerResizerComponent } from './explorer-resizer.component';

describe('ExplorerResizerComponent', () => {
  let component: ExplorerResizerComponent;
  let fixture: ComponentFixture<ExplorerResizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorerResizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorerResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
