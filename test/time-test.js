import assert from 'assert';
import * as time from '../app/utils/time';

describe('time functions', () => {

  describe('diff', () => {
    it('calculates correctly', () => {
      assert.equal(time.diff(['12:00', '12:30']), 0.5);
    });
    it('handles dubious times (surprisingly enough...)', () => {
      assert.equal(time.diff(['1000', '11/30']), 1.5);
      assert.equal(time.diff(['12 00', '12-30']), 0.5);
      assert.equal(time.diff(['13', '15']), 2.0);
    });
    it('ignores invalid times', () => {
      assert.equal(time.diff(['lolwut', 'wheee']), 0.0);
    });
    it('returns 0 instead of NaN', () => {
      assert.equal(time.diff(['lolwut', '12:30']), 0.0);
    });
    it('rounds to nearest .5', () => {
      assert.equal(time.diff(['10:00', '10:00']), 0.0);
      assert.equal(time.diff(['10:00', '10:14']), 0.0);
      assert.equal(time.diff(['10:00', '10:15']), 0.5);
      assert.equal(time.diff(['10:00', '10:29']), 0.5);
      assert.equal(time.diff(['10:00', '10:30']), 0.5);
      assert.equal(time.diff(['10:00', '10:44']), 0.5);
      assert.equal(time.diff(['10:00', '10:45']), 1.0);
      assert.equal(time.diff(['10:00', '10:59']), 1.0);
      assert.equal(time.diff(['10:00', '11:00']), 1.0);
    });
  });

  describe('aggregate', () => {
    it('calculates correctly', () => {
      assert.equal(time.aggregate([['07:30', '11:30'], ['13:00', '16:30']]), 7.5);
    });
    it('handles dubious times (surprisingly enough...)', () => {
      assert.equal(time.aggregate([['1000', '11/30'], ['12 00', '12-30'], ['13', '15']]), 4.0);
    });
    it('ignores invalid times', () => {
      assert.equal(time.aggregate([['00:00', '08:00'], ['lolwut', 'wheee']]), 8.0);
      assert.equal(time.aggregate([['meow', '11:30'], ['12:00', '17:00']]), 5.0);
    });
    it('rounds to nearest .5', () => {
      assert.equal(time.aggregate([['00:00', '00:14']]), 0.0);
      assert.equal(time.aggregate([['00:00', '00:15']]), 0.5);
      assert.equal(time.aggregate([['00:00', '00:44']]), 0.5);
      assert.equal(time.aggregate([['00:00', '00:45']]), 1.0);
    });
  });
});
