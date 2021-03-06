export function nameValidation(name: string): boolean {
  let validName = true;
  if (!name) validName = false;
  return validName;
}

export function priceValidation(price: string): boolean {
  try {
    const priceString = price.replace(/,/g, ".");
    const arr = priceString.split(".");
    if (arr.length > 2) return false;
    if (arr.length > 1 && arr[arr.length - 1].length > 2) return false;
    let priceConv = parseFloat(priceString);
    if (isNaN(priceConv)) return false;
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

export function isNIP(snumber: string): boolean {
  if (snumber.includes("'") || snumber.includes(".") || snumber.includes("-")) return false;
  let result = false;
  try {
    const number = Number(snumber);
    if (!isNaN(number) && Number.isInteger(number)) result = true;
  } catch (error) {
    console.log(error);
  }
  return result;
}
