import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearLikesComponent } from './clear-likes.component';

describe('ClearLikesComponent', () => {
  let component: ClearLikesComponent;
  let fixture: ComponentFixture<ClearLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
