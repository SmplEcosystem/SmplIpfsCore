import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitDbKeyValueComponent } from './orbit-db-key-value.component';

describe('OrbitdbKeyvalueComponent', () => {
  let component: OrbitDbKeyValueComponent;
  let fixture: ComponentFixture<OrbitDbKeyValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitDbKeyValueComponent]
    });
    fixture = TestBed.createComponent(OrbitDbKeyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
