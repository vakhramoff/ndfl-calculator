import { ref, computed } from 'vue';
import type { MonthlyIncome, TaxCalculationResult, MonthlyTaxResult } from '../types';
import { calculateNdfl, calculateMonthlyNdfl, calculateMonthlyTaxBreakdown, calculateSameMonthlyTaxBreakdown } from '../utils';

// Глобальное состояние
const annualIncome = ref(0);
const monthlyIncomes = ref<ReadonlyArray<MonthlyIncome>>([]);
const monthlyIncome = ref(0);
const inputMode = ref<'annual' | 'monthly' | 'monthly-same'>('monthly-same');

const calculationResult = computed((): TaxCalculationResult => {
  if (inputMode.value === 'monthly' && monthlyIncomes.value.length > 0) {
    const hasIncome = monthlyIncomes.value.some(month => month.amount > 0);
    if (hasIncome) {
      return calculateMonthlyNdfl(monthlyIncomes.value);
    }
  }
  if (inputMode.value === 'monthly-same' && monthlyIncome.value > 0) {
    const annualFromMonthly = monthlyIncome.value * 12;
    return calculateNdfl(annualFromMonthly);
  }
  if (inputMode.value === 'annual' && annualIncome.value > 0) {
    return calculateNdfl(annualIncome.value);
  }
  // Возвращаем пустой результат если нет данных
  return {
    totalIncome: 0,
    totalTax: 0,
    brackets: []
  };
});

const monthlyBreakdownResult = computed((): MonthlyTaxResult | null => {
  if (inputMode.value === 'monthly' && monthlyIncomes.value.length > 0) {
    const hasIncome = monthlyIncomes.value.some(month => month.amount > 0);
    if (hasIncome) {
      return calculateMonthlyTaxBreakdown(monthlyIncomes.value);
    }
  }
  if (inputMode.value === 'monthly-same' && monthlyIncome.value > 0) {
    return calculateSameMonthlyTaxBreakdown(monthlyIncome.value);
  }
  if (inputMode.value === 'annual' && annualIncome.value > 0) {
    // Для годового дохода показываем равномерное распределение по месяцам
    const monthlyAmount = annualIncome.value / 12;
    return calculateSameMonthlyTaxBreakdown(monthlyAmount);
  }
  return null;
});

export function useTaxCalculation() {
  const setAnnualIncome = (income: number) => {
    annualIncome.value = income;
    inputMode.value = 'annual';
  };

  const setMonthlyIncomes = (incomes: ReadonlyArray<MonthlyIncome>) => {
    monthlyIncomes.value = incomes;
    inputMode.value = 'monthly';
  };

  const setMonthlyIncome = (income: number) => {
    monthlyIncome.value = income;
    inputMode.value = 'monthly-same';
  };

  const setInputMode = (mode: 'annual' | 'monthly' | 'monthly-same') => {
    inputMode.value = mode;
  };

  return {
    annualIncome,
    monthlyIncomes,
    monthlyIncome,
    inputMode,
    calculationResult,
    monthlyBreakdownResult,
    setAnnualIncome,
    setMonthlyIncomes,
    setMonthlyIncome,
    setInputMode
  };
}