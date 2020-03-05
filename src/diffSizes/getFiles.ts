import getPercentage from './getPercentage';
import { Size, Change } from '../types';

export default function getFiles(oldSizes?: Size[], newSizes?: Size[]): Change[] {
  return newSizes && newSizes.length
    ? newSizes.map(newSize => {
        const oldSize = oldSizes && oldSizes.find(({ path }) => path === newSize.path);
        const oldBytes = oldSize ? oldSize.bytes : 0;
        const { path, bytes } = newSize;
        const change = bytes - oldBytes;
        const percent = getPercentage(oldBytes, bytes);
        return { path, bytes, change, percent };
      })
    : oldSizes && oldSizes.length
    ? oldSizes.map(oldSize => {
        const { path } = oldSize;
        const bytes = 0;
        const change = oldSize.bytes * -1;
        const percent = -100;
        return { path, bytes, change, percent };
      })
    : [];
}
