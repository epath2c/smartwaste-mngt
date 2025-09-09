import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerListComponent } from './cleaner-list.component';

describe('CleanerListComponent', () => {
  let component: CleanerListComponent;
  let fixture: ComponentFixture<CleanerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleanerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
