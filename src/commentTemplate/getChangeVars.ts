import prettyBytes from 'pretty-bytes';
import { Changes, Value, Change, FormattedChange, TemplateVars } from '../types';

export default function getTemplateVars({ total, files }: Value<Changes>): TemplateVars {
  const { path, change, percent, bytes } = formatChange(total);
  const changed = files.filter(f => f.change !== 0).map(formatChange);
  const unchanged = files.filter(f => f.change === 0).map(formatChange);
  return { path, change, percent, bytes, changed, unchanged };
}

function formatChange(rawChange: Change): FormattedChange {
  const change = formatBytes(rawChange.change, { sign: true });
  const bytes = formatBytes(rawChange.bytes);
  const percent = `${rawChange.percent.toFixed(2)} %`;
  const path = rawChange.path;
  return { percent, path, change, bytes };
}

function formatBytes(num: number, { sign = false } = {}): string {
  return (sign && num > 0 ? '+' : '') + prettyBytes(num);
}
