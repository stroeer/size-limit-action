import { name } from '../package.json';

export default function getPrCommentMarker(): string {
  return `<!-- generated by ${name} -->`;
}