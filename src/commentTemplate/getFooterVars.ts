import prettyBytes from 'pretty-bytes';
import { Changes, FooterVars } from '../types';

export default function getFooterVars(changes: Changes): FooterVars {
  const values = Object.values(changes);
  const affectedPackages = values.length;
  const numTotalChange = values.reduce((sum, { total }) => sum + total.change, 0);
  const totalChange = prettyBytes(numTotalChange);
  const totalPercent = `x %`;
  return { affectedPackages, totalChange, totalPercent };
}
