import type { TaxBracket, TaxCalculationResult, MonthlyIncome, MonthlyTaxCalculation, MonthlyTaxResult } from '../types';
import { TAX_BRACKETS } from '../constants';

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export function calculateNdfl(
  annualIncome: number, 
  brackets: ReadonlyArray<TaxBracket> = TAX_BRACKETS
): TaxCalculationResult {
  const result: TaxCalculationResult['brackets'] = [];
  let totalTax = 0;

  for (const bracket of brackets) {
    // Определяем налогооблагаемую сумму для этого диапазона
    const bracketStart = bracket.min;
    const bracketEnd = bracket.max || Infinity;
    
    // Доход в этом диапазоне = min(доход - начало_диапазона, размер_диапазона)
    const taxableAmount = Math.max(0, Math.min(
      annualIncome - bracketStart,
      bracketEnd - bracketStart
    ));

    if (taxableAmount > 0) {
      const taxAmount = taxableAmount * bracket.rate;
      totalTax += taxAmount;
      
      result.push({
        bracket,
        taxableAmount,
        taxAmount
      });
    }
  }

  return {
    totalIncome: annualIncome,
    totalTax,
    brackets: result
  };
}

export function calculateMonthlyNdfl(
  monthlyIncomes: ReadonlyArray<MonthlyIncome>
): TaxCalculationResult {
  const annualIncome = monthlyIncomes.reduce((sum, month) => sum + month.amount, 0);
  return calculateNdfl(annualIncome);
}

export function calculateMonthlyTaxBreakdown(
  monthlyIncomes: ReadonlyArray<MonthlyIncome>,
  brackets: ReadonlyArray<TaxBracket> = TAX_BRACKETS
): MonthlyTaxResult {
  const monthlyCalculations: MonthlyTaxCalculation[] = [];
  let cumulativeIncome = 0;
  let cumulativeTax = 0;

  for (let i = 0; i < 12; i++) {
    const monthIncome = monthlyIncomes.find(m => m.month === i + 1)?.amount || 0;
    cumulativeIncome += monthIncome;
    
    // Рассчитываем налог нарастающим итогом
    const newCumulativeTax = calculateNdfl(cumulativeIncome, brackets).totalTax;
    const currentMonthTax = newCumulativeTax - cumulativeTax;
    
    cumulativeTax = newCumulativeTax;
    
    monthlyCalculations.push({
      month: i + 1,
      monthName: MONTH_NAMES[i],
      grossIncome: monthIncome,
      cumulativeIncome,
      taxAmount: currentMonthTax,
      netIncome: monthIncome - currentMonthTax
    });
  }

  const totalGrossIncome = monthlyCalculations.reduce((sum, calc) => sum + calc.grossIncome, 0);
  const totalTax = monthlyCalculations.reduce((sum, calc) => sum + calc.taxAmount, 0);

  return {
    monthlyCalculations,
    totalGrossIncome,
    totalTax,
    totalNetIncome: totalGrossIncome - totalTax
  };
}

export function calculateSameMonthlyTaxBreakdown(
  monthlyIncome: number,
  brackets: ReadonlyArray<TaxBracket> = TAX_BRACKETS
): MonthlyTaxResult {
  const monthlyIncomes: MonthlyIncome[] = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    amount: monthlyIncome
  }));
  
  return calculateMonthlyTaxBreakdown(monthlyIncomes, brackets);
}
