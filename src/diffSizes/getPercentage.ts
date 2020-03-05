export default function getPercentage(oldBytes: number, newBytes: number): number {
  const change = newBytes - oldBytes;
  if (oldBytes === 0) return newBytes > 0 ? 100 : newBytes < 0 ? -100 : 0;
  return (change / oldBytes) * 100;
}
