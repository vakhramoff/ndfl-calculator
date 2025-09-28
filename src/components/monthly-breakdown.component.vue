<template>
  <div class="monthly-breakdown ios-card ios-animate-fade-in">
    <div class="monthly-breakdown__header">
      <h3 class="ios-text-title-3 monthly-breakdown__title">Расчет по месяцам</h3>
    </div>
    
    <div class="monthly-breakdown__summary">
      <div class="monthly-breakdown__summary-card">
        <div class="monthly-breakdown__summary-content">
          <span class="ios-text-footnote monthly-breakdown__label">Общий доход</span>
          <span class="ios-text-title-2 monthly-breakdown__value">
            {{ formatCurrency(result.totalGrossIncome) }}
          </span>
        </div>
        <div class="monthly-breakdown__summary-icon monthly-breakdown__summary-icon--income">
          💰
        </div>
      </div>
      
      <div class="monthly-breakdown__summary-card monthly-breakdown__summary-card--tax">
        <div class="monthly-breakdown__summary-content">
          <span class="ios-text-footnote monthly-breakdown__label">Общий НДФЛ</span>
          <span class="ios-text-title-2 monthly-breakdown__value monthly-breakdown__value--tax">
            {{ formatCurrency(result.totalTax) }}
          </span>
        </div>
        <div class="monthly-breakdown__summary-icon monthly-breakdown__summary-icon--tax">
          📊
        </div>
      </div>
      
      <div class="monthly-breakdown__summary-card monthly-breakdown__summary-card--net">
        <div class="monthly-breakdown__summary-content">
          <span class="ios-text-footnote monthly-breakdown__label">Доход на руки</span>
          <span class="ios-text-title-2 monthly-breakdown__value monthly-breakdown__value--net">
            {{ formatCurrency(result.totalNetIncome) }}
          </span>
        </div>
        <div class="monthly-breakdown__summary-icon monthly-breakdown__summary-icon--net">
          💳
        </div>
      </div>
    </div>

    <div class="monthly-breakdown__table-section">
      <h4 class="ios-text-headline monthly-breakdown__table-title">Детализация по месяцам</h4>
      <div class="monthly-breakdown__table-container">
        <table class="ios-table monthly-breakdown__table">
          <thead>
            <tr>
              <th class="ios-text-subhead">Месяц</th>
              <th class="ios-text-subhead">Доход</th>
              <th class="ios-text-subhead">Накопительный доход</th>
              <th class="ios-text-subhead">НДФЛ</th>
              <th class="ios-text-subhead">На руки</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="calc in result.monthlyCalculations" 
              :key="calc.month"
              class="monthly-breakdown__row"
              :class="{ 'monthly-breakdown__row--zero': calc.grossIncome === 0 }"
            >
              <td class="ios-text-body monthly-breakdown__cell monthly-breakdown__cell--month">
                {{ calc.monthName }}
              </td>
              <td class="ios-text-body monthly-breakdown__cell">
                {{ formatCurrency(calc.grossIncome) }}
              </td>
              <td class="ios-text-body monthly-breakdown__cell">
                {{ formatCurrency(calc.cumulativeIncome) }}
              </td>
              <td class="ios-text-body monthly-breakdown__cell monthly-breakdown__cell--tax">
                {{ formatCurrency(calc.taxAmount) }}
              </td>
              <td class="ios-text-body monthly-breakdown__cell monthly-breakdown__cell--net">
                {{ formatCurrency(calc.netIncome) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MonthlyTaxResult } from '@/types';
import { formatCurrency } from '@/utils';

defineProps<{
  result: MonthlyTaxResult;
}>();
</script>

<style scoped>
.monthly-breakdown {
  margin-top: var(--ios-space-lg);
}

.monthly-breakdown__header {
  margin-bottom: var(--ios-space-lg);
}

.monthly-breakdown__title {
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-sm);
}

.monthly-breakdown__summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--ios-space-md);
  margin-bottom: var(--ios-space-xl);
}

/* Responsive grid for summary cards */
@media (min-width: 1200px) {
  .monthly-breakdown__summary {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--ios-space-lg);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .monthly-breakdown__summary {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--ios-space-md);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .monthly-breakdown__summary {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ios-space-md);
  }
}

.monthly-breakdown__summary-card {
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

.monthly-breakdown__summary-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--ios-shadow-medium);
}

.monthly-breakdown__summary-card--tax {
  background: linear-gradient(135deg, var(--ios-red), #ff6b6b);
  border-color: var(--ios-red);
}

.monthly-breakdown__summary-card--tax .monthly-breakdown__label,
.monthly-breakdown__summary-card--tax .monthly-breakdown__value {
  color: white;
}

.monthly-breakdown__summary-card--net {
  background: linear-gradient(135deg, var(--ios-green), #4ecdc4);
  border-color: var(--ios-green);
}

.monthly-breakdown__summary-card--net .monthly-breakdown__label,
.monthly-breakdown__summary-card--net .monthly-breakdown__value {
  color: white;
}

.monthly-breakdown__summary-content {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-xs);
  flex: 1;
}

.monthly-breakdown__label {
  color: var(--ios-text-secondary);
  font-weight: 500;
}

.monthly-breakdown__value {
  color: var(--ios-text-primary);
  font-weight: 700;
}

.monthly-breakdown__value--tax {
  color: var(--ios-red);
}

.monthly-breakdown__value--net {
  color: var(--ios-green);
}

.monthly-breakdown__summary-icon {
  font-size: 32px;
  opacity: 0.8;
  margin-left: var(--ios-space-md);
}

.monthly-breakdown__summary-icon--income {
  font-size: 28px;
}

.monthly-breakdown__summary-icon--tax {
  font-size: 28px;
}

.monthly-breakdown__summary-icon--net {
  font-size: 28px;
}

.monthly-breakdown__table-section {
  margin-top: var(--ios-space-xl);
}

.monthly-breakdown__table-title {
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-lg);
}

.monthly-breakdown__table-container {
  overflow-x: auto;
  border-radius: var(--ios-radius-medium);
}

.monthly-breakdown__table {
  margin: 0;
}

.monthly-breakdown__row {
  transition: background-color 0.2s ease;
}

.monthly-breakdown__row:hover {
  background-color: var(--ios-gray-1);
}

.monthly-breakdown__row--zero {
  opacity: 0.6;
}

.monthly-breakdown__cell {
  padding: var(--ios-space-md);
}

.monthly-breakdown__cell--month {
  font-weight: 500;
  color: var(--ios-text-primary);
}

.monthly-breakdown__cell--tax {
  color: var(--ios-red);
  font-weight: 600;
}

.monthly-breakdown__cell--net {
  color: var(--ios-green);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .monthly-breakdown__summary {
    grid-template-columns: 1fr;
    gap: var(--ios-space-sm);
  }
  
  .monthly-breakdown__summary-card {
    padding: var(--ios-space-md);
  }
  
  .monthly-breakdown__summary-icon {
    font-size: 24px;
  }
  
  .monthly-breakdown__summary-icon--income,
  .monthly-breakdown__summary-icon--tax,
  .monthly-breakdown__summary-icon--net {
    font-size: 20px;
  }
  
  .monthly-breakdown__table {
    font-size: var(--ios-font-size-footnote);
  }
  
  .monthly-breakdown__cell {
    padding: var(--ios-space-sm);
  }
}

@media (max-width: 480px) {
  .monthly-breakdown__summary-card {
    padding: var(--ios-space-sm);
  }
  
  .monthly-breakdown__summary-content {
    gap: var(--ios-space-xs);
  }
  
  .monthly-breakdown__summary-icon {
    font-size: 20px;
    margin-left: var(--ios-space-sm);
  }
  
  .monthly-breakdown__summary-icon--income,
  .monthly-breakdown__summary-icon--tax,
  .monthly-breakdown__summary-icon--net {
    font-size: 18px;
  }
  
  .monthly-breakdown__table {
    font-size: var(--ios-font-size-caption);
  }
  
  .monthly-breakdown__cell {
    padding: var(--ios-space-xs);
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .monthly-breakdown__summary-card {
  background-color: var(--ios-gray-1);
  border-color: var(--ios-gray-2);
}

[data-theme="dark"] .monthly-breakdown__summary-card:hover {
  background-color: var(--ios-gray-2);
}

[data-theme="dark"] .monthly-breakdown__row:hover {
  background-color: var(--ios-gray-1);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .monthly-breakdown__summary-card {
    background-color: var(--ios-gray-1);
    border-color: var(--ios-gray-2);
  }
  
  :root:not([data-theme]) .monthly-breakdown__summary-card:hover {
    background-color: var(--ios-gray-2);
  }
  
  :root:not([data-theme]) .monthly-breakdown__row:hover {
    background-color: var(--ios-gray-1);
  }
}
</style>
