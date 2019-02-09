import expect from 'expect';

const add = (a,b) => a + b;

const result = add(2,3);

describe('test test', () => {
  it('should return 5', () => {
    expect(result).toBe(5);
  });
});