import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashbinsAddComponent } from './trashbins-add.component';

describe('TrashbinsAddComponent', () => {
  let component: TrashbinsAddComponent;
  let fixture: ComponentFixture<TrashbinsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashbinsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashbinsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
