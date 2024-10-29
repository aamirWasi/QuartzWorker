/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuartzService } from './quartz.service';

describe('Service: Quartz', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuartzService]
    });
  });

  it('should ...', inject([QuartzService], (service: QuartzService) => {
    expect(service).toBeTruthy();
  }));
});
