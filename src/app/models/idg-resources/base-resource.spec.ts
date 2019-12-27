import { BaseResource } from './base-resource';

describe('BaseResource', () => {
  it('should create an instance', () => {
    expect(new BaseResource({name: 'tim', resourceType: 'tim', generatingIC: 'tiim', })).toBeTruthy();
  });
});
