import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserDetailsComponent } from './current-user-details.component';

describe('CurrentUserDetailsComponent', () => {
  let component: CurrentUserDetailsComponent;
  let fixture: ComponentFixture<CurrentUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
