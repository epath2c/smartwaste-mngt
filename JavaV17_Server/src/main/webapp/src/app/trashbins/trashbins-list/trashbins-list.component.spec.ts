import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashbinsListComponent } from './trashbins-list.component';

describe('TrashbinsListComponent', () => {
  let component: TrashbinsListComponent;
  let fixture: ComponentFixture<TrashbinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashbinsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashbinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
