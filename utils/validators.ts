export function nameValidation(name: string): boolean {
  let validName = true;
  if (!name) validName = false;
  return validName;
}

export function priceValidation(price: string): boolean {
  try {
    let priceConv = parseFloat(price.replace(/,/g, "."));
    if (isNaN(priceConv)) return false;
    if (!((priceConv * 100) % 1 === 0)) return false;
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}
