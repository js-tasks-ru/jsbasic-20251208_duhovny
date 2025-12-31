function truncate(str, maxlength) {
  if (maxlength <= 0) return '';
  if (typeof str !== 'string') return '';
  if (str.length <= maxlength) {
    return str;
  };
  if (maxlength === 1) {
    return str.slice(0, 1); 
  }
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + '…';
  } else {
    return str;
  }
}
