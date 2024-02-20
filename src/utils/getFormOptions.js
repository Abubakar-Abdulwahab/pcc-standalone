/* eslint-disable prettier/prettier */
export function getFormOptions(arr) {
  return arr.map((el) => ({
    label: el,
    id: el
  }));
}
