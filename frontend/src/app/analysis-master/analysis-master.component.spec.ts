import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisMasterComponent } from './analysis-master.component';

describe('AnalysisMasterComponent', () => {
  let component: AnalysisMasterComponent;
  let fixture: ComponentFixture<AnalysisMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
