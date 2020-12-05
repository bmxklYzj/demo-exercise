export const cloneDeep = (source) => {
  if (typeof source === 'object' && source) {
    const result = Array.isArray(source) ? [] : {};
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        result[key] = cloneDeep(source[key]);
      }
    }
    return result;
  }

  return source;
}