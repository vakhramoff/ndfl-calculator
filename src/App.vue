<template>
  <div id="app">
    <div class="app-container">
      <header class="app-header">
        <div class="app-header__content">
          <div class="app-header__text">
            <h1 class="app-title">Калькулятор НДФЛ</h1>
            <p class="app-subtitle">Рассчитайте подоходный налог</p>
          </div>
          <button 
            class="app-theme-toggle"
            @click="toggleTheme"
            :title="isDarkMode ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'"
          >
            <span class="app-theme-toggle__icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
          </button>
        </div>
      </header>
      
      <main class="app-main">
        <CalculatorForm />
        
        <TaxBracketsTable />
        
        <CalculationResult 
          v-if="calculationResult.totalIncome > 0"
          :result="calculationResult" 
        />
        
        <MonthlyBreakdown 
          v-if="monthlyBreakdownResult && monthlyBreakdownResult.totalGrossIncome > 0"
          :result="monthlyBreakdownResult" 
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CalculatorForm, TaxBracketsTable, CalculationResult, MonthlyBreakdown } from '@/components';
import { useTaxCalculation } from '@/composables';

const { calculationResult, monthlyBreakdownResult } = useTaxCalculation();

// Theme management
const isDarkMode = ref(false);

const initTheme = () => {
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    // User has manually set a preference
    isDarkMode.value = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // Use system preference
    isDarkMode.value = prefersDark;
    if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
};

// Listen for system theme changes
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  // Only update if user hasn't manually set a preference
  if (!localStorage.getItem('theme')) {
    isDarkMode.value = e.matches;
    if (e.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
};

onMounted(() => {
  initTheme();
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  
  // Cleanup listener on unmount
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
});
</script>

<style>
/* iOS Design System Variables */
:root {
  /* iOS Colors */
  --ios-blue: #007AFF;
  --ios-blue-dark: #0056CC;
  --ios-green: #34C759;
  --ios-red: #FF3B30;
  --ios-orange: #FF9500;
  --ios-purple: #AF52DE;
  --ios-pink: #FF2D92;
  --ios-teal: #5AC8FA;
  --ios-indigo: #5856D6;
  
  /* iOS Grays */
  --ios-gray-1: #F2F2F7;
  --ios-gray-2: #E5E5EA;
  --ios-gray-3: #D1D1D6;
  --ios-gray-4: #C7C7CC;
  --ios-gray-5: #AEAEB2;
  --ios-gray-6: #8E8E93;
  --ios-gray-7: #636366;
  --ios-gray-8: #48484A;
  --ios-gray-9: #3A3A3C;
  --ios-gray-10: #2C2C2E;
  --ios-gray-11: #1C1C1E;
  
  /* iOS Backgrounds */
  --ios-bg-primary: #FFFFFF;
  --ios-bg-secondary: #F2F2F7;
  --ios-bg-tertiary: #FFFFFF;
  --ios-bg-grouped: #F2F2F7;
  --ios-bg-grouped-secondary: #FFFFFF;
  
  /* iOS Text Colors */
  --ios-text-primary: #000000;
  --ios-text-secondary: #3C3C43;
  --ios-text-tertiary: #3C3C4399;
  --ios-text-quaternary: #3C3C4366;
  
  /* iOS Shadows */
  --ios-shadow-small: 0 1px 3px rgba(0, 0, 0, 0.1);
  --ios-shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
  --ios-shadow-large: 0 8px 24px rgba(0, 0, 0, 0.2);
  
  /* iOS Border Radius */
  --ios-radius-small: 8px;
  --ios-radius-medium: 12px;
  --ios-radius-large: 16px;
  --ios-radius-xl: 20px;
  
  /* iOS Spacing */
  --ios-space-xs: 4px;
  --ios-space-sm: 8px;
  --ios-space-md: 16px;
  --ios-space-lg: 24px;
  --ios-space-xl: 32px;
  --ios-space-2xl: 48px;
  --ios-space-3xl: 64px;
  
  /* iOS Typography */
  --ios-font-size-large-title: 34px;
  --ios-font-size-title-1: 28px;
  --ios-font-size-title-2: 22px;
  --ios-font-size-title-3: 20px;
  --ios-font-size-headline: 17px;
  --ios-font-size-body: 17px;
  --ios-font-size-callout: 16px;
  --ios-font-size-subhead: 15px;
  --ios-font-size-footnote: 13px;
  --ios-font-size-caption-1: 12px;
  --ios-font-size-caption-2: 11px;
  
  --ios-line-height-large-title: 41px;
  --ios-line-height-title-1: 34px;
  --ios-line-height-title-2: 28px;
  --ios-line-height-title-3: 25px;
  --ios-line-height-headline: 22px;
  --ios-line-height-body: 22px;
  --ios-line-height-callout: 21px;
  --ios-line-height-subhead: 20px;
  --ios-line-height-footnote: 18px;
  --ios-line-height-caption-1: 16px;
  --ios-line-height-caption-2: 13px;
}

/* Theme System */
:root {
  /* Light theme (default) */
  --ios-bg-primary: #FFFFFF;
  --ios-bg-secondary: #F2F2F7;
  --ios-bg-tertiary: #FFFFFF;
  --ios-bg-grouped: #F2F2F7;
  --ios-bg-grouped-secondary: #FFFFFF;
  
  --ios-text-primary: #000000;
  --ios-text-secondary: #3C3C43;
  --ios-text-tertiary: #3C3C4399;
  --ios-text-quaternary: #3C3C4366;
}

/* Dark theme */
[data-theme="dark"] {
  --ios-bg-primary: #000000;
  --ios-bg-secondary: #1C1C1E;
  --ios-bg-tertiary: #2C2C2E;
  --ios-bg-grouped: #000000;
  --ios-bg-grouped-secondary: #1C1C1E;
  
  --ios-text-primary: #FFFFFF;
  --ios-text-secondary: #EBEBF5;
  --ios-text-tertiary: #EBEBF599;
  --ios-text-quaternary: #EBEBF566;
  
  /* Dark theme specific overrides */
  --ios-gray-1: #2C2C2E;
  --ios-gray-2: #3A3A3C;
  --ios-gray-3: #48484A;
}

/* Auto theme based on system preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --ios-bg-primary: #000000;
    --ios-bg-secondary: #1C1C1E;
    --ios-bg-tertiary: #2C2C2E;
    --ios-bg-grouped: #000000;
    --ios-bg-grouped-secondary: #1C1C1E;
    
    --ios-text-primary: #FFFFFF;
    --ios-text-secondary: #EBEBF5;
    --ios-text-tertiary: #EBEBF599;
    --ios-text-quaternary: #EBEBF566;
    
    /* Dark theme specific overrides */
    --ios-gray-1: #2C2C2E;
    --ios-gray-2: #3A3A3C;
    --ios-gray-3: #48484A;
  }
}

/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--ios-bg-grouped);
  color: var(--ios-text-primary);
  line-height: 1.5;
  font-size: var(--ios-font-size-body);
  line-height: var(--ios-line-height-body);
}

#app {
  min-height: 100vh;
  padding: var(--ios-space-sm);
  padding-top: max(var(--ios-space-md), env(safe-area-inset-top));
  padding-bottom: max(var(--ios-space-md), env(safe-area-inset-bottom));
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-header {
  margin-bottom: var(--ios-space-xl);
  padding: var(--ios-space-lg) 0;
}

.app-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
}

.app-header__text {
  flex: 1;
  text-align: center;
}

.app-title {
  font-size: var(--ios-font-size-large-title);
  font-weight: 700;
  line-height: var(--ios-line-height-large-title);
  color: var(--ios-text-primary);
  margin-bottom: var(--ios-space-sm);
}

.app-subtitle {
  font-size: var(--ios-font-size-subhead);
  font-weight: 400;
  line-height: var(--ios-line-height-subhead);
  color: var(--ios-text-secondary);
}

.app-theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--ios-bg-tertiary);
  border: 1px solid var(--ios-gray-3);
  border-radius: var(--ios-radius-small);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: var(--ios-space-md);
}

.app-theme-toggle:hover {
  background-color: var(--ios-gray-2);
  transform: scale(1.05);
}

.app-theme-toggle:active {
  transform: scale(0.95);
}

.app-theme-toggle__icon {
  font-size: 20px;
  line-height: 1;
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: var(--ios-space-lg);
}

/* iOS Card Component */
.ios-card {
  background-color: var(--ios-bg-grouped-secondary);
  border-radius: var(--ios-radius-medium);
  padding: var(--ios-space-lg);
  box-shadow: var(--ios-shadow-small);
  border: 1px solid var(--ios-gray-2);
}

/* iOS Button Component */
.ios-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--ios-space-md) var(--ios-space-lg);
  background-color: var(--ios-blue);
  color: white;
  border: none;
  border-radius: var(--ios-radius-small);
  font-size: var(--ios-font-size-body);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px; /* iOS touch target */
}

.ios-button:hover {
  background-color: var(--ios-blue-dark);
  transform: translateY(-1px);
}

.ios-button:active {
  transform: translateY(0);
}

.ios-button--secondary {
  background-color: var(--ios-gray-2);
  color: var(--ios-text-primary);
}

.ios-button--secondary:hover {
  background-color: var(--ios-gray-3);
}

/* iOS Input Component */
.ios-input {
  width: 100%;
  padding: var(--ios-space-md);
  background-color: var(--ios-bg-tertiary);
  border: 1px solid var(--ios-gray-3);
  border-radius: var(--ios-radius-small);
  font-size: var(--ios-font-size-body);
  color: var(--ios-text-primary);
  transition: all 0.2s ease;
  min-height: 44px; /* iOS touch target */
}

.ios-input:focus {
  outline: none;
  border-color: var(--ios-blue);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.ios-input::placeholder {
  color: var(--ios-text-quaternary);
}

/* Remove number input spinners */
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Safari and Chrome */
  margin: 0;
}

/* Specific styling for iOS inputs */
.ios-input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

.ios-input[type="number"]::-webkit-outer-spin-button,
.ios-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Safari and Chrome */
  margin: 0;
}

/* iOS Segmented Control */
.ios-segmented-control {
  display: flex;
  background-color: var(--ios-gray-2);
  border-radius: var(--ios-radius-small);
  padding: var(--ios-space-xs);
  margin-bottom: var(--ios-space-lg);
}

.ios-segmented-control__option {
  flex: 1;
  padding: var(--ios-space-sm) var(--ios-space-md);
  background: transparent;
  border: none;
  border-radius: calc(var(--ios-radius-small) - var(--ios-space-xs));
  font-size: var(--ios-font-size-subhead);
  font-weight: 500;
  color: var(--ios-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
}

.ios-segmented-control__option--active {
  background-color: var(--ios-bg-primary);
  color: var(--ios-text-primary);
  box-shadow: var(--ios-shadow-small);
}

/* iOS Table Component */
.ios-table {
  width: 100%;
  background-color: var(--ios-bg-grouped-secondary);
  border-radius: var(--ios-radius-medium);
  overflow: hidden;
  box-shadow: var(--ios-shadow-small);
}

.ios-table th {
  background-color: var(--ios-gray-1);
  color: var(--ios-text-primary);
  padding: var(--ios-space-md);
  text-align: left;
  font-size: var(--ios-font-size-subhead);
  font-weight: 600;
  border-bottom: 1px solid var(--ios-gray-2);
}

.ios-table td {
  padding: var(--ios-space-md);
  border-bottom: 1px solid var(--ios-gray-2);
  font-size: var(--ios-font-size-body);
}

.ios-table tr:last-child td {
  border-bottom: none;
}

.ios-table tr:hover {
  background-color: var(--ios-gray-1);
}

/* iOS Typography */
.ios-text-large-title {
  font-size: var(--ios-font-size-large-title);
  font-weight: 700;
  line-height: var(--ios-line-height-large-title);
}

.ios-text-title-1 {
  font-size: var(--ios-font-size-title-1);
  font-weight: 700;
  line-height: var(--ios-line-height-title-1);
}

.ios-text-title-2 {
  font-size: var(--ios-font-size-title-2);
  font-weight: 700;
  line-height: var(--ios-line-height-title-2);
}

.ios-text-title-3 {
  font-size: var(--ios-font-size-title-3);
  font-weight: 600;
  line-height: var(--ios-line-height-title-3);
}

.ios-text-headline {
  font-size: var(--ios-font-size-headline);
  font-weight: 600;
  line-height: var(--ios-line-height-headline);
}

.ios-text-body {
  font-size: var(--ios-font-size-body);
  font-weight: 400;
  line-height: var(--ios-line-height-body);
}

.ios-text-callout {
  font-size: var(--ios-font-size-callout);
  font-weight: 400;
  line-height: var(--ios-line-height-callout);
}

.ios-text-subhead {
  font-size: var(--ios-font-size-subhead);
  font-weight: 400;
  line-height: var(--ios-line-height-subhead);
}

.ios-text-footnote {
  font-size: var(--ios-font-size-footnote);
  font-weight: 400;
  line-height: var(--ios-line-height-footnote);
}

.ios-text-caption {
  font-size: var(--ios-font-size-caption-1);
  font-weight: 400;
  line-height: var(--ios-line-height-caption-1);
}

/* iOS Animations */
@keyframes ios-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ios-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ios-animate-fade-in {
  animation: ios-fade-in 0.3s ease-out;
}

.ios-animate-scale-in {
  animation: ios-scale-in 0.2s ease-out;
}

/* Responsive Design */
@media (min-width: 1400px) {
  .app-container {
    max-width: 1400px;
  }
  
  #app {
    padding: var(--ios-space-md);
  }
  
  .app-title {
    font-size: var(--ios-font-size-large-title);
    line-height: var(--ios-line-height-large-title);
  }
  
  .app-subtitle {
    font-size: var(--ios-font-size-body);
    line-height: var(--ios-line-height-body);
  }
}

@media (min-width: 1200px) {
  .app-container {
    max-width: 1200px;
  }
}

@media (min-width: 992px) {
  .app-container {
    max-width: 1000px;
  }
}

@media (min-width: 768px) {
  .app-container {
    max-width: 800px;
  }
  
  #app {
    padding: var(--ios-space-sm);
  }
}

@media (max-width: 768px) {
  #app {
    padding: var(--ios-space-sm);
  }
  
  .app-container {
    max-width: 100%;
  }
  
  .app-title {
    font-size: var(--ios-font-size-title-1);
    line-height: var(--ios-line-height-title-1);
  }
  
  .app-header__content {
    flex-direction: column;
    gap: var(--ios-space-md);
  }
  
  .app-theme-toggle {
    margin-left: 0;
    align-self: center;
  }
}

@media (max-width: 480px) {
  #app {
    padding: var(--ios-space-xs);
  }
  
  .app-title {
    font-size: var(--ios-font-size-title-2);
    line-height: var(--ios-line-height-title-2);
  }
  
  .ios-segmented-control {
    flex-direction: column;
    gap: var(--ios-space-xs);
  }
  
  .ios-segmented-control__option {
    border-radius: var(--ios-radius-small);
  }
}
</style>
