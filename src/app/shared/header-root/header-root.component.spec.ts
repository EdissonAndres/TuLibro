import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRootComponent } from './header-root.component';

describe('HeaderRootComponent', () => {
  let component: HeaderRootComponent;
  let fixture: ComponentFixture<HeaderRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
