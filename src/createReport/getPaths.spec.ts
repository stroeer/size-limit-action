import { resolve } from 'path';
import getPaths from './getPaths';

describe('getPaths', () => {
  test('globs packages/ui-library', async () => {
    const pattern = resolve(__dirname, '../__fixtures_/packages/ui-library');
    const expectedPackages = [expect.stringMatching(/\/__fixtures_\/packages\/ui-library$/)];
    await expect(getPaths(pattern)).resolves.toStrictEqual(expectedPackages);
  });

  test('globs packages/*', async () => {
    const pattern = resolve(__dirname, '../__fixtures_/packages/*');
    const expectedPackages = [
      expect.stringMatching(/\/__fixtures_\/packages\/content-api$/),
      expect.stringMatching(/\/__fixtures_\/packages\/ui-library$/),
    ];
    await expect(getPaths(pattern)).resolves.toStrictEqual(expectedPackages);
  });
});
