export function nameValidation(name: string): boolean {
  let validName = true;
  if (!name) validName = false;
  return validName;
}

export function priceValidation(price: number): boolean {
  let validPrice = true;
  if (isNaN(price)) validPrice = false;
  if (!((price * 100) % 1 === 0)) validPrice = false;
  return validPrice;
}
