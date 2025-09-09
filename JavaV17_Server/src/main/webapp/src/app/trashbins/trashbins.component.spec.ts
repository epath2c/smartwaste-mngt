import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashbinsComponent } from './trashbins.component';

describe('TrashbinsComponent', () => {
  let component: TrashbinsComponent;
  let fixture: ComponentFixture<TrashbinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashbinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashbinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
