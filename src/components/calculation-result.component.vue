<template>
  <div class="calculation-result ios-card ios-animate-fade-in">
    <div class="calculation-result__header">
      <h3 class="ios-text-title-3 calculation-result__title">Результат расчета</h3>
    </div>
    
    <div class="calculation-result__summary">
      <div class="calculation-result__summary-card">
        <div class="calculation-result__summary-content">
          <span class="ios-text-footnote calculation-result__label">Общий доход</span>
          <span class="ios-text-title-2 calculation-result__value">
            {{ formatCurrency(result.totalIncome) }}
          </span>
        </div>
        <div class="calculation-result__summary-icon calculation-result__summary-icon--income">
          💰
        </div>
      </div>
      
      <div class="calculation-result__summary-card calculation-result__summary-card--tax">
        <div class="calculation-result__summary-content">
          <span class="ios-text-footnote calculation-result__label">НДФЛ к уплате</span>
          <span class="ios-text-title-2 calculation-result__value calculation-result__value--tax">
            {{ formatCurrency(result.totalTax) }}
          </span>
        </div>
        <div class="calculation-result__summary-icon calculation-result__summary-icon--tax">
          📊
        </div>
      </div>
      
      <div class="calculation-result__summary-card calculation-result__summary-card--rate">
        <div class="calculation-result__summary-content">
          <span class="ios-text-footnote calculation-result__label">Эффективная ставка</span>
          <span class="ios-text-title-2 calculation-result__value calculation-result__value--rate">
            {{ formatPercentage(result.totalTax / result.totalIncome) }}
          </span>
        </div>
        <div class="calculation-result__summary-icon calculation-result__summary-icon--rate">
          📈
        </div>
      </div>
    </div>

    <div v-if="result.brackets.length > 0" class="calculation-result__breakdown">
      <h4 class="ios-text-headline calculation-result__breakdown-title">Детализация по диапазонам</h4>
      <div class="calculation-result__breakdown-table">
        <table class="ios-table calculation-result__table">
          <thead>
            <tr>
              <th class="ios-text-subhead">Диапазон</th>
              <th class="ios-text-subhead">Налогооблагаемая сумма</th>
              <th class="ios-text-subhead">Ставка</th>
              <th class="ios-text-subhead">Налог</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(item, index) in result.brackets" 
              :key="index"
              class="calculation-result__table-row"
            >
              <td class="ios-text-body calculation-result__table-cell">
                {{ formatCurrency(item.bracket.min) }} - 
                {{ item.bracket.max ? formatCurrency(item.bracket.max) : '∞' }}
              </td>
              <td class="ios-text-body calculation-result__table-cell">
                {{ formatCurrency(item.taxableAmount) }}
              </td>
              <td class="ios-text-body calculation-result__table-cell calculation-result__table-cell--rate">
                {{ formatPercentage(item.bracket.rate) }}
              </td>
              <td class="ios-text-body calculation-result__table-cell calculation-result__table-cell--tax">
                {{ formatCurrency(item.taxAmount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaxCalculationResult } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils';

defineProps<{
  result: TaxCalculationResult;
}>();
</script>

<style scoped>
.calculation-result {
  margin-top: var(--ios-space-lg);
}

.calculation-result__header {
  margin-bottom: var(--ios-space-lg);
}

.calculation-result__title {
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-sm);
}

.calculation-result__summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--ios-space-md);
  margin-bottom: var(--ios-space-xl);
}

/* Responsive grid for summary cards */
@media (min-width: 1200px) {
  .calculation-result__summary {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--ios-space-lg);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .calculation-result__summary {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--ios-space-md);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .calculation-result__summary {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ios-space-md);
  }
}

.calculation-result__summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ios-space-lg);
  background-color: var(--ios-bg-tertiary);
  border-radius: var(--ios-radius-medium);
  border: 1px solid var(--ios-gray-2);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.calculation-result__summary-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--ios-shadow-medium);
}

.calculation-result__summary-card--tax {
  background: linear-gradient(135deg, var(--ios-red), #ff6b6b);
  border-color: var(--ios-red);
}

.calculation-result__summary-card--tax .calculation-result__label,
.calculation-result__summary-card--tax .calculation-result__value {
  color: white;
}

.calculation-result__summary-card--rate {
  background: linear-gradient(135deg, var(--ios-blue), var(--ios-teal));
  border-color: var(--ios-blue);
}

.calculation-result__summary-card--rate .calculation-result__label,
.calculation-result__summary-card--rate .calculation-result__value {
  color: white;
}

.calculation-result__summary-content {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-xs);
  flex: 1;
}

.calculation-result__label {
  color: var(--ios-text-secondary);
  font-weight: 500;
}

.calculation-result__value {
  color: var(--ios-text-primary);
  font-weight: 700;
}

.calculation-result__value--tax {
  color: var(--ios-red);
}

.calculation-result__value--rate {
  color: var(--ios-blue);
}

.calculation-result__summary-icon {
  font-size: 32px;
  opacity: 0.8;
  margin-left: var(--ios-space-md);
}

.calculation-result__summary-icon--income {
  font-size: 28px;
}

.calculation-result__summary-icon--tax {
  font-size: 28px;
}

.calculation-result__summary-icon--rate {
  font-size: 28px;
}

.calculation-result__breakdown {
  margin-top: var(--ios-space-xl);
}

.calculation-result__breakdown-title {
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-lg);
}

.calculation-result__breakdown-table {
  overflow-x: auto;
  border-radius: var(--ios-radius-medium);
}

.calculation-result__table {
  margin: 0;
}

.calculation-result__table-row {
  transition: background-color 0.2s ease;
}

.calculation-result__table-row:hover {
  background-color: var(--ios-gray-1);
}

.calculation-result__table-cell {
  padding: var(--ios-space-md);
}

.calculation-result__table-cell--rate {
  color: var(--ios-blue);
  font-weight: 600;
}

.calculation-result__table-cell--tax {
  color: var(--ios-red);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calculation-result__summary {
    grid-template-columns: 1fr;
    gap: var(--ios-space-sm);
  }
  
  .calculation-result__summary-card {
    padding: var(--ios-space-md);
  }
  
  .calculation-result__summary-icon {
    font-size: 24px;
  }
  
  .calculation-result__summary-icon--income,
  .calculation-result__summary-icon--tax,
  .calculation-result__summary-icon--rate {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .calculation-result__summary-card {
    padding: var(--ios-space-sm);
  }
  
  .calculation-result__summary-content {
    gap: var(--ios-space-xs);
  }
  
  .calculation-result__summary-icon {
    font-size: 20px;
    margin-left: var(--ios-space-sm);
  }
  
  .calculation-result__summary-icon--income,
  .calculation-result__summary-icon--tax,
  .calculation-result__summary-icon--rate {
    font-size: 18px;
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .calculation-result__summary-card {
  background-color: var(--ios-gray-1);
  border-color: var(--ios-gray-2);
}

[data-theme="dark"] .calculation-result__summary-card:hover {
  background-color: var(--ios-gray-2);
}

[data-theme="dark"] .calculation-result__table-row:hover {
  background-color: var(--ios-gray-1);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .calculation-result__summary-card {
    background-color: var(--ios-gray-1);
    border-color: var(--ios-gray-2);
  }
  
  :root:not([data-theme]) .calculation-result__summary-card:hover {
    background-color: var(--ios-gray-2);
  }
  
  :root:not([data-theme]) .calculation-result__table-row:hover {
    background-color: var(--ios-gray-1);
  }
}
</style>
