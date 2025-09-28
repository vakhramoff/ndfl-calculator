import type { MonthlyIncome } from '../types';

export function validateIncome(value: number): string | undefined {
  if (value < 0) {
    return 'Доход не может быть отрицательным';
  }
  if (value > 1_000_000_000) {
    return 'Доход слишком большой';
  }
  return undefined;
}

export function validateMonthlyData(monthlyIncomes: ReadonlyArray<MonthlyIncome>): ReadonlyArray<string> {
  const errors: string[] = [];
  
  monthlyIncomes.forEach((income, index) => {
    const error = validateIncome(income.amount);
    if (error) {
      errors[index] = error;
    }
  });
  
  return errors;
}
