export function formatStats(num: number) {
  if (num >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  } else if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    if (formatted.endsWith('.0') || num >= 10000) {
      return formatted.slice(0, -2) + 'k';
    }
    return formatted + 'k';
  }
  return num.toString();
}
