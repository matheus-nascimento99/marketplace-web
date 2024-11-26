export function maskCurrency(value: string): string {
  // Remove non-digit characters
  const numbers = value.replace(/\D/g, '')

  // Convert to number and divide by 100 to get decimal places
  const amount = parseFloat(numbers) / 100

  // Format as currency
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace('R$', '')
    .trim()
}
