import assert from 'assert';
import sinon from 'sinon';
import * as store from '../app/utils/store';

console.debug = () => {};

describe('store', () => {
  beforeEach(() => {
    global.localStorage = {};
  });

  describe('deserialize', () => {
    it('reads from localStorage', () => {
      localStorage.getItem = sinon.stub().returns('{"foo":"bar"}');
      store.deserialize();
      assert.ok(localStorage.getItem.calledOnce);
      assert.deepEqual(localStorage.getItem.firstCall.args, ['state']);
    });
    it('generates new model if localStorage is empty', () => {
      localStorage.getItem = sinon.stub();
      const state = store.deserialize();
      assert.deepEqual(Object.keys(state), ['days', 'requiredHours']);
    });
    it('does not regenerate new model if localStorage has data', () => {
      localStorage.getItem = sinon.stub().returns('{"foo":"bar"}');
      const state = store.deserialize();
      assert.deepEqual(state, {foo: 'bar'});
    });
  });

  describe('serialize', () => {
    it('writes to localStorage', () => {
      localStorage.setItem = sinon.stub();
      store.serialize({foo: 'bar'});
      assert.ok(localStorage.setItem.calledOnce);
      assert.deepEqual(localStorage.setItem.firstCall.args, ['state', '{"foo":"bar"}']);
    });
    it('can handle multiple calls', () => {
      localStorage.setItem = sinon.stub();
      store.serialize({foo: 'bar'});
      store.serialize({foo: 'boo'});
      store.serialize({foo: 'baz'});
      assert.ok(localStorage.setItem.calledThrice);
    });
  });

  describe('clear', () => {
    it('empties localStorage', () => {
      localStorage.clear = sinon.stub();
      store.clear();
      assert.ok(localStorage.clear.calledOnce);
    });
  });
});
