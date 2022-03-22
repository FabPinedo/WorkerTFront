import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoComponent } from './tareo.component';

describe('TareoComponent', () => {
  let component: TareoComponent;
  let fixture: ComponentFixture<TareoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
