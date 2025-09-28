<template>
  <div class="tax-brackets-table ios-card ios-animate-fade-in">
    <div class="tax-brackets-table__header">
      <h3 class="ios-text-title-3 tax-brackets-table__title">Налоговые диапазоны</h3>
      <p class="ios-text-footnote tax-brackets-table__subtitle">
        Актуальные ставки НДФЛ на {{ new Date().getFullYear() }} год
      </p>
    </div>
    
    <div class="tax-brackets-table__container">
      <table class="ios-table tax-brackets-table__table">
        <thead>
          <tr>
            <th class="ios-text-subhead">От</th>
            <th class="ios-text-subhead">До</th>
            <th class="ios-text-subhead">Ставка</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(bracket, index) in formattedBrackets" 
            :key="index"
            class="tax-brackets-table__row"
          >
            <td class="ios-text-body tax-brackets-table__cell">
              {{ bracket.minFormatted }}
            </td>
            <td class="ios-text-body tax-brackets-table__cell">
              {{ bracket.maxFormatted }}
            </td>
            <td class="ios-text-body tax-brackets-table__cell tax-brackets-table__cell--rate">
              {{ bracket.rateFormatted }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaxBrackets } from '@/composables';

const { formattedBrackets } = useTaxBrackets();
</script>

<style scoped>
.tax-brackets-table {
  margin-bottom: var(--ios-space-lg);
}

.tax-brackets-table__header {
  margin-bottom: var(--ios-space-lg);
}

.tax-brackets-table__title {
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-xs);
}

.tax-brackets-table__subtitle {
  color: var(--ios-text-tertiary);
  margin: 0;
}

.tax-brackets-table__container {
  overflow-x: auto;
  border-radius: var(--ios-radius-medium);
}

.tax-brackets-table__table {
  margin: 0;
}

.tax-brackets-table__row {
  transition: background-color 0.2s ease;
}

.tax-brackets-table__row:hover {
  background-color: var(--ios-gray-1);
}

.tax-brackets-table__cell {
  padding: var(--ios-space-md);
}

.tax-brackets-table__cell--rate {
  color: var(--ios-blue);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tax-brackets-table__table {
    font-size: var(--ios-font-size-footnote);
  }
  
  .tax-brackets-table__cell {
    padding: var(--ios-space-sm);
  }
}

@media (max-width: 480px) {
  .tax-brackets-table__table {
    font-size: var(--ios-font-size-caption);
  }
  
  .tax-brackets-table__cell {
    padding: var(--ios-space-xs);
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .tax-brackets-table__row:hover {
  background-color: var(--ios-gray-1);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .tax-brackets-table__row:hover {
    background-color: var(--ios-gray-1);
  }
}
</style>
