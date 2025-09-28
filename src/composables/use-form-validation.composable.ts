import { ref, computed } from 'vue';
import type { ValidationErrors, MonthlyIncome } from '../types';
import { validateIncome, validateMonthlyData } from '../utils';

export function useFormValidation() {
  const errors = ref<ValidationErrors>({});

  const validateAnnualIncome = (income: number): boolean => {
    const error = validateIncome(income);
    if (error) {
      errors.value = { ...errors.value, annualIncome: error };
      return false;
    } else {
      const { annualIncome: _, ...rest } = errors.value;
      errors.value = rest;
      return true;
    }
  };

  const validateMonthlyIncome = (income: number): boolean => {
    const error = validateIncome(income);
    if (error) {
      errors.value = { ...errors.value, monthlyIncome: error };
      return false;
    } else {
      const { monthlyIncome: _, ...rest } = errors.value;
      errors.value = rest;
      return true;
    }
  };

  const hasErrors = computed(() => 
    Object.keys(errors.value).length > 0
  );

  const clearErrors = () => {
    errors.value = {};
  };

  const validateMonthlyIncomes = (monthlyIncomes: ReadonlyArray<MonthlyIncome>): boolean => {
    const monthlyErrors = validateMonthlyData(monthlyIncomes);
    const hasErrors = monthlyErrors.some(error => error !== undefined);
    
    if (hasErrors) {
      errors.value = { ...errors.value, monthlyIncomes: monthlyErrors };
      return false;
    } else {
      const { monthlyIncomes: _, ...rest } = errors.value;
      errors.value = rest;
      return true;
    }
  };

  return {
    errors,
    hasErrors,
    validateAnnualIncome,
    validateMonthlyIncomes,
    validateMonthlyIncome,
    clearErrors
  };
}
