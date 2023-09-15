// Função para validar a data no formato dd/mm/yyyy
export function isValidPtBRDate(dateString: string): boolean {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!datePattern.test(dateString)) return false;
  const [, day, month, year] = dateString.match(datePattern) || [];
  const parsedDate = new Date(`${year}-${month}-${day}`);
  return (
    parsedDate.getDate() === parseInt(day, 10) &&
    parsedDate.getMonth() + 1 === parseInt(month, 10) &&
    parsedDate.getFullYear() === parseInt(year, 10)
  );
}