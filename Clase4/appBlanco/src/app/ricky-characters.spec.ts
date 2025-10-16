import { TestBed } from '@angular/core/testing';

import { RickyCharacters } from './ricky-characters';

describe('RickyCharacters', () => {
  let service: RickyCharacters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyCharacters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
