module.exports.isValidNdbno = (item) => {
  if (typeof item === 'number') {
    item = item.toString();
  }
  if (typeof item !== 'string') {
    return false;
  }
  if (item.length !== 5) {
    return false;
  }
  for(let i = 0; i < item.length; i++) {
    if (isNaN(item[i])) {
      return false;
    }
  }
  return true;
}