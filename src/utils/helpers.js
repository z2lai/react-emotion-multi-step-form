export function isEmpty(data) {
  if (typeof (data) == 'number' || typeof (data) == 'boolean') {
    return false;
  }
  if (typeof (data) == 'undefined' || data === null) {
    return true;
  }
  if (typeof (data.length) != 'undefined') {
    return data.length == 0;
  }
  let count = 0;
  for (let i in data) {
    if (data.hasOwnProperty(i)) {
      count++;
    }
  }
  return count == 0;
}