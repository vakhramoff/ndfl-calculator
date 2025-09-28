import type { MonthlyIncome } from './tax.type';

export type FormData = Readonly<{
  annualIncome: number;
  monthlyIncomes: ReadonlyArray<MonthlyIncome>;
  monthlyIncome: number;
  inputMode: 'annual' | 'monthly' | 'monthly-same';
}>;

export type ValidationErrors = Readonly<{
  annualIncome?: string;
  monthlyIncomes?: ReadonlyArray<string>;
  monthlyIncome?: string;
}>;
