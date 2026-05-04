"use client";
import { useState } from "react";
import SelectPocketTypeSingleCard from "./SelectPocketTypeSingleCard";
import { POCKET_TYPES } from "@/shared/enums/pocket/pocket-types.enums";

const SelectPocketTypes = ({
  onPocketTypeChange,
}: {
  onPocketTypeChange: (type: POCKET_TYPES) => void;
}) => {
  const [selected, setSelected] = useState<POCKET_TYPES>(
    POCKET_TYPES.INDIVIDUAL,
  );

  const handleSelect = (type: POCKET_TYPES) => {
    setSelected(type);
    onPocketTypeChange(type);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:justify-between md:items-stretch space-x-4">
      <SelectPocketTypeSingleCard
        pocketType={POCKET_TYPES.INDIVIDUAL}
        selected={selected === POCKET_TYPES.INDIVIDUAL}
        setSelected={() => handleSelect(POCKET_TYPES.INDIVIDUAL)}
      />
      <SelectPocketTypeSingleCard
        pocketType={POCKET_TYPES.SHARED}
        selected={selected === POCKET_TYPES.SHARED}
        setSelected={() => handleSelect(POCKET_TYPES.SHARED)}
      />
    </div>
  );
};

export default SelectPocketTypes;
