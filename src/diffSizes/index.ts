import { Size, Changes, Value } from '../types';
import getFiles from './getFiles';
import getTotal from './getTotal';

export default function diffSizes(path: string, oldSizes?: Size[], newSizes?: Size[]): [string, Value<Changes>] {
  const files = getFiles(oldSizes, newSizes);
  const total = getTotal(path, files);
  return [path, { total, files }];
}
