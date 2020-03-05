import { diff } from './report';

describe('report', () => {
  const file5 = { path: 'file5.js', bytes: 5 };
  const file10 = { path: 'file10.js', bytes: 10 };

  const incFile5 = { ...file5, bytes: 10 };
  const incFile10 = { ...file10, bytes: 20 };

  const decFile5 = { ...file5, bytes: 1 };
  const decFile10 = { ...file10, bytes: 5 };

  test.each`
    name                                                             | oldSizes                      | newSizes
    ${'an empty object for empty inputs'}                            | ${{}}                         | ${{}}
    ${'files as extra bytes'}                                        | ${{}}                         | ${{ myPkg: [file5, file10] }}
    ${'existing files as unchanged'}                                 | ${{ myPkg: [file5, file10] }} | ${{ myPkg: [file5, file10] }}
    ${'removed files missing bytes'}                                 | ${{ myPkg: [file5, file10] }} | ${{ myPkg: [] }}
    ${'additions in bytes and percentages when sizes have changed'}  | ${{ myPkg: [file5, file10] }} | ${{ myPkg: [incFile5, incFile10] }}
    ${'reductions in bytes and percentages when sizes have changed'} | ${{ myPkg: [file5, file10] }} | ${{ myPkg: [decFile5, decFile10] }}
    ${'reductions and additions at the same time'}                   | ${{ myPkg: [file5, file10] }} | ${{ myPkg: [decFile5, incFile10] }}
  `('diff returns $name', async ({ oldSizes, newSizes }) => {
    await expect(diff(oldSizes, newSizes)).resolves.toMatchSnapshot();
  });
});
