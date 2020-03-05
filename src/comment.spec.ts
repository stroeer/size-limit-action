import { createCommentFromChanges } from './comment';

describe('comment', () => {
  test('createCommentFromChanges returns the expected string', async () => {
    const file5 = { bytes: 1, change: -4, path: 'file5.js', percent: -80 };
    const file10 = { bytes: 20, change: 10, path: 'file10.js', percent: 100 };
    const fileX = { bytes: 10, change: 0, path: 'fileX.js', percent: 0 };

    const diff = {
      myPkg: {
        files: [file5, file10, fileX],
        total: { bytes: 31, change: 6, path: 'myPkg', percent: 0.1935483871 },
      },
    };

    await expect(createCommentFromChanges(diff)).resolves.toMatchSnapshot();
  });
});
