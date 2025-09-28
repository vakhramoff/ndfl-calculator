import type { TaxBracket } from '../types';

export const TAX_BRACKETS: ReadonlyArray<TaxBracket> = [
  { min: 0, max: 2_400_000, rate: 0.13 },
  { min: 2_400_000, max: 5_000_000, rate: 0.15 },
  { min: 5_000_000, max: 20_000_000, rate: 0.18 },
  { min: 20_000_000, max: 50_000_000, rate: 0.20 },
  { min: 50_000_000, max: null, rate: 0.22 }
] as const;
