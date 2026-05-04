import { useState } from "react";
import { CURRENCIES } from "../enums/currencies.enums";

export const useCurrency = () => {
  const { currency, setCurrency } = useState<CURRENCIES>(CURRENCIES.EUR);

  return [currency, setCurrency] as const;
};
