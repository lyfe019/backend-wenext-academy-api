// backend-api/tests/unit/math.test.js
function add(a, b) {
  return a + b;
}

describe('add function', () => {
  test('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('should handle negative numbers', () => {
    expect(add(-1, -1)).toBe(-2);
  });
});