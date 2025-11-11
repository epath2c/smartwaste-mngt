import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashbinEditComponent } from './trashbin-edit.component';

describe('TrashbinEditComponent', () => {
  let component: TrashbinEditComponent;
  let fixture: ComponentFixture<TrashbinEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashbinEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashbinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
