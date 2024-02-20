export default function splitCamelCase(charArray) {
  return charArray.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}
