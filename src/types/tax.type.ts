export type TaxBracket = Readonly<{
  min: number;
  max: number | null;
  rate: number;
}>;

export type TaxCalculationResult = Readonly<{
  totalIncome: number;
  totalTax: number;
  brackets: ReadonlyArray<{
    bracket: TaxBracket;
    taxableAmount: number;
    taxAmount: number;
  }>;
}>;

export type MonthlyIncome = Readonly<{
  month: number;
  amount: number;
}>;

export type MonthlyTaxCalculation = Readonly<{
  month: number;
  monthName: string;
  grossIncome: number;
  cumulativeIncome: number;
  taxAmount: number;
  netIncome: number;
}>;

export type MonthlyTaxResult = Readonly<{
  monthlyCalculations: ReadonlyArray<MonthlyTaxCalculation>;
  totalGrossIncome: number;
  totalTax: number;
  totalNetIncome: number;
}>;
