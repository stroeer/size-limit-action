import getPercentage from './getPercentage';

describe('report', () => {
  test.each`
    oldBytes | newbBytes | expected
    ${0}     | ${0}      | ${0}
    ${0}     | ${10}     | ${100}
    ${10}    | ${0}      | ${-100}
    ${10}    | ${10}     | ${0}
    ${10}    | ${11}     | ${10}
    ${10}    | ${9}      | ${-10}
    ${100}   | ${100}    | ${0}
    ${100}   | ${101}    | ${1}
    ${100}   | ${99}     | ${-1}
  `('the percentage diff $newbBytes / $oldBytes = $expected %', ({ oldBytes, newbBytes, expected }) => {
    expect(getPercentage(oldBytes, newbBytes)).toBe(expected);
  });
});
