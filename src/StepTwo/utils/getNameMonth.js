
export function getNameMonth(month) {
  if (month === 1) {
    return 'месяц';
  }
  if (month >= 2 && month <= 4) {
    return 'месяца'
  }
  return 'месяцев';
}