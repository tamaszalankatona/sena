"use client";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../ui/dropdown-menu";
import { CURRENCIES } from "@/shared/enums/currencies.enums";
import { RiArrowDownSLine } from "@remixicon/react";

const CurrencyChangerDropdown = ({
  setCurrency,
  currency,
}: {
  setCurrency: (currency: string) => void;
  currency: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {currency} <RiArrowDownSLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select currency</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
            {Object.values(CURRENCIES).map((currency) => (
              <DropdownMenuRadioItem key={currency} value={currency}>
                {currency}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyChangerDropdown;
