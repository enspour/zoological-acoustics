import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuduTeleportComponent } from './teleport.component';

describe('TeleportComponent', () => {
  let component: KuduTeleportComponent;
  let fixture: ComponentFixture<KuduTeleportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTeleportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTeleportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
