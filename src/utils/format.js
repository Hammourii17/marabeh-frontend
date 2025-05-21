export const formatCurrency = (value, locale = 'en-SA') => {
  if (value === null || value === undefined) return '0.00'

  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
