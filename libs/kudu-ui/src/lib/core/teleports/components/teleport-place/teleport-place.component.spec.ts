import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuduTeleportPlaceComponent } from './teleport-place.component';

describe('PortalComponent', () => {
  let component: KuduTeleportPlaceComponent;
  let fixture: ComponentFixture<KuduTeleportPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTeleportPlaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTeleportPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
