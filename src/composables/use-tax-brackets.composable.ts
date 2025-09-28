import { computed } from 'vue';
import { TAX_BRACKETS } from '../constants';
import { formatCurrency, formatPercentage } from '../utils';

export function useTaxBrackets() {
  const taxBrackets = computed(() => TAX_BRACKETS);

  const formattedBrackets = computed(() => 
    taxBrackets.value.map(bracket => ({
      ...bracket,
      minFormatted: formatCurrency(bracket.min),
      maxFormatted: bracket.max ? formatCurrency(bracket.max) : '∞',
      rateFormatted: formatPercentage(bracket.rate)
    }))
  );

  return {
    taxBrackets,
    formattedBrackets
  };
}
