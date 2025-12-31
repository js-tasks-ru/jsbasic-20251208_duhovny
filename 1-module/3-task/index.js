function ucFirst(str) {
  if (typeof str !== 'string') return '';
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}