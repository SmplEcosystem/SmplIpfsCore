import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpfsCoreComponent } from './ipfs-core.component';

describe('IpfsCoreComponent', () => {
  let component: IpfsCoreComponent;
  let fixture: ComponentFixture<IpfsCoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpfsCoreComponent]
    });
    fixture = TestBed.createComponent(IpfsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
