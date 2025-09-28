<template>
  <div class="calculator-form ios-card ios-animate-fade-in">
    <div class="calculator-form__mode-selector">
      <div class="ios-segmented-control">
        <button 
          class="ios-segmented-control__option"
          :class="{ 'ios-segmented-control__option--active': inputMode === 'monthly-same' }"
          @click="setMode('monthly-same')"
        >
          Ежемесячный
        </button>
        <button 
          class="ios-segmented-control__option"
          :class="{ 'ios-segmented-control__option--active': inputMode === 'annual' }"
          @click="setMode('annual')"
        >
          Годовой
        </button>
        <button 
          class="ios-segmented-control__option"
          :class="{ 'ios-segmented-control__option--active': inputMode === 'monthly' }"
          @click="setMode('monthly')"
        >
          По месяцам
        </button>
      </div>
    </div>

    <div class="calculator-form__content">
      <!-- Monthly Same Income Input -->
      <div v-if="inputMode === 'monthly-same'" class="calculator-form__input-group ios-animate-scale-in">
        <label class="calculator-form__label">
          <span class="calculator-form__label-text ios-text-subhead">Ежемесячный доход</span>
          <div class="calculator-form__input-wrapper">
            <input 
              type="number" 
              v-model.number="monthlyIncome"
              @input="handleMonthlyIncomeChange"
              class="ios-input calculator-form__input"
              placeholder="Введите сумму"
            />
            <span class="calculator-form__currency">₽</span>
          </div>
          <div v-if="errors.monthlyIncome" class="calculator-form__error">
            {{ errors.monthlyIncome }}
          </div>
          <div class="calculator-form__preview">
            <div class="calculator-form__preview-item">
              <span class="ios-text-footnote">Годовой доход:</span>
              <span class="ios-text-callout calculator-form__preview-value">
                {{ formatCurrency(monthlyIncome * 12) }}
              </span>
            </div>
          </div>
        </label>
      </div>

      <!-- Annual Income Input -->
      <div v-if="inputMode === 'annual'" class="calculator-form__input-group ios-animate-scale-in">
        <label class="calculator-form__label">
          <span class="calculator-form__label-text ios-text-subhead">Годовой доход</span>
          <div class="calculator-form__input-wrapper">
            <input 
              type="number" 
              v-model.number="annualIncome"
              @input="handleAnnualIncomeChange"
              class="ios-input calculator-form__input"
              placeholder="Введите сумму"
            />
            <span class="calculator-form__currency">₽</span>
          </div>
          <div v-if="errors.annualIncome" class="calculator-form__error">
            {{ errors.annualIncome }}
          </div>
        </label>
      </div>

      <!-- Monthly Inputs -->
      <div v-if="inputMode === 'monthly'" class="calculator-form__monthly-group ios-animate-scale-in">
        <h3 class="ios-text-headline calculator-form__monthly-title">Доходы по месяцам</h3>
        <div class="calculator-form__months-grid">
          <div 
            v-for="(month, index) in monthlyInputs" 
            :key="index"
            class="calculator-form__month-item"
          >
            <label class="calculator-form__month-label">
              <span class="ios-text-footnote calculator-form__month-name">
                {{ getMonthName(index) }}
              </span>
              <div class="calculator-form__input-wrapper calculator-form__input-wrapper--small">
                <input 
                  type="number" 
                  v-model.number="monthlyInputs[index]"
                  @input="handleMonthlyIncomesChange"
                  class="ios-input calculator-form__input calculator-form__input--small"
                  placeholder="0"
                />
                <span class="calculator-form__currency calculator-form__currency--small">₽</span>
              </div>
              <div v-if="errors.monthlyIncomes?.[index]" class="calculator-form__error calculator-form__error--small">
                {{ errors.monthlyIncomes[index] }}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { MonthlyIncome } from '@/types';
import { useTaxCalculation, useFormValidation } from '@/composables';
import { formatCurrency } from '@/utils';

const { 
  annualIncome, 
  monthlyIncomes, 
  monthlyIncome,
  inputMode, 
  setAnnualIncome, 
  setMonthlyIncomes, 
  setMonthlyIncome,
  setInputMode 
} = useTaxCalculation();

const { 
  errors, 
  validateAnnualIncome, 
  validateMonthlyIncomes, 
  validateMonthlyIncome,
  clearErrors 
} = useFormValidation();

const monthlyInputs = ref<number[]>(new Array(12).fill(0));

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const getMonthName = (index: number): string => monthNames[index];

const setMode = (mode: string) => {
  clearErrors();
  setInputMode(mode);
};

const handleAnnualIncomeChange = () => {
  validateAnnualIncome(annualIncome.value);
  setAnnualIncome(annualIncome.value);
};

const handleMonthlyIncomeChange = () => {
  validateMonthlyIncome(monthlyIncome.value);
  setMonthlyIncome(monthlyIncome.value);
};

const handleMonthlyIncomesChange = () => {
  const monthlyData: MonthlyIncome[] = monthlyInputs.value.map((amount, index) => ({
    month: index + 1,
    amount: amount || 0
  }));
  
  validateMonthlyIncomes(monthlyData);
  setMonthlyIncomes(monthlyData);
};

// Следим за изменениями режима ввода
watch(inputMode, (newMode) => {
  if (newMode === 'monthly') {
    monthlyInputs.value = new Array(12).fill(0);
  }
});
</script>

<style scoped>
.calculator-form {
  margin-bottom: var(--ios-space-lg);
}

.calculator-form__mode-selector {
  margin-bottom: var(--ios-space-lg);
}

.calculator-form__content {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-md);
}

.calculator-form__input-group {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-sm);
}

.calculator-form__label {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-sm);
}

.calculator-form__label-text {
  color: var(--ios-text-secondary);
  font-weight: 500;
}

.calculator-form__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.calculator-form__input {
  padding-right: 40px;
  text-align: right;
  font-weight: 600;
  font-size: var(--ios-font-size-title-3);
}

.calculator-form__input--small {
  font-size: var(--ios-font-size-body);
  padding-right: 30px;
}

.calculator-form__currency {
  position: absolute;
  right: var(--ios-space-md);
  color: var(--ios-text-tertiary);
  font-weight: 500;
  font-size: var(--ios-font-size-body);
  pointer-events: none;
}

.calculator-form__currency--small {
  right: var(--ios-space-sm);
  font-size: var(--ios-font-size-subhead);
}

.calculator-form__error {
  color: var(--ios-red);
  font-size: var(--ios-font-size-footnote);
  margin-top: var(--ios-space-xs);
}

.calculator-form__error--small {
  font-size: var(--ios-font-size-caption);
}

.calculator-form__preview {
  margin-top: var(--ios-space-md);
  padding: var(--ios-space-md);
  background-color: var(--ios-gray-1);
  border-radius: var(--ios-radius-small);
  border: 1px solid var(--ios-gray-2);
}

.calculator-form__preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calculator-form__preview-value {
  color: var(--ios-text-primary);
  font-weight: 600;
}

.calculator-form__monthly-group {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-lg);
}

.calculator-form__monthly-title {
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-sm);
}

.calculator-form__months-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--ios-space-md);
}

/* Responsive grid for monthly inputs */
@media (min-width: 1200px) {
  .calculator-form__months-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .calculator-form__months-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .calculator-form__months-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.calculator-form__month-item {
  background-color: var(--ios-gray-1);
  border-radius: var(--ios-radius-small);
  padding: var(--ios-space-md);
  border: 1px solid var(--ios-gray-2);
  transition: all 0.2s ease;
}

.calculator-form__month-item:hover {
  background-color: var(--ios-bg-tertiary);
  border-color: var(--ios-gray-3);
}

.calculator-form__month-label {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-sm);
}

.calculator-form__month-name {
  color: var(--ios-text-secondary);
  font-weight: 500;
  text-transform: capitalize;
}

.calculator-form__input-wrapper--small {
  margin-top: var(--ios-space-xs);
}

/* iOS Segmented Control Customization */
.calculator-form .ios-segmented-control {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calculator-form__months-grid {
    grid-template-columns: 1fr;
  }
  
  .calculator-form__input {
    font-size: var(--ios-font-size-title-2);
  }
  
  .calculator-form__input--small {
    font-size: var(--ios-font-size-subhead);
  }
}

@media (max-width: 480px) {
  .calculator-form__months-grid {
    gap: var(--ios-space-sm);
  }
  
  .calculator-form__month-item {
    padding: var(--ios-space-sm);
  }
  
  .calculator-form__input {
    font-size: var(--ios-font-size-title-3);
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .calculator-form__preview {
  background-color: var(--ios-gray-1);
  border-color: var(--ios-gray-2);
}

[data-theme="dark"] .calculator-form__month-item {
  background-color: var(--ios-gray-1);
  border-color: var(--ios-gray-2);
}

[data-theme="dark"] .calculator-form__month-item:hover {
  background-color: var(--ios-gray-2);
  border-color: var(--ios-gray-3);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .calculator-form__preview {
    background-color: var(--ios-gray-1);
    border-color: var(--ios-gray-2);
  }
  
  :root:not([data-theme]) .calculator-form__month-item {
    background-color: var(--ios-gray-1);
    border-color: var(--ios-gray-2);
  }
  
  :root:not([data-theme]) .calculator-form__month-item:hover {
    background-color: var(--ios-gray-2);
    border-color: var(--ios-gray-3);
  }
}
</style>
