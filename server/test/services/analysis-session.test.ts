import assert from 'assert';
import app from '../../src/app';

describe('\'analysis-session\' service', () => {
  it('registered the service', () => {
    const service = app.service('analysis-sessions');

    assert.ok(service, 'Registered the service');
  });
});
