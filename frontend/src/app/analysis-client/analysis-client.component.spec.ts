import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisClientComponent } from './analysis-client.component';

describe('AnalysisClientComponent', () => {
  let component: AnalysisClientComponent;
  let fixture: ComponentFixture<AnalysisClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
