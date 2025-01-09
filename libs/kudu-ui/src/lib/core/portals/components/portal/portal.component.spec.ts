import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuduPortalComponent } from './portal.component';

describe('PortalComponent', () => {
  let component: KuduPortalComponent;
  let fixture: ComponentFixture<KuduPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduPortalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
