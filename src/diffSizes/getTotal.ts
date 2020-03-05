import getPercentage from './getPercentage';
import { Change } from '../types';

export default function getTotal(path: string, files: Change[]): Change {
  const bytes = files.reduce((sum, { bytes }) => sum + bytes, 0);
  const change = files.reduce((sum, { change }) => sum + change, 0);
  const oldTotalBytes = bytes - change;
  const percent = getPercentage(oldTotalBytes, bytes);
  return { path, bytes, change, percent };
}
