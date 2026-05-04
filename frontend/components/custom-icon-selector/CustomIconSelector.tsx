"use client";
import { POCKET_ICONS } from "@/shared/constants/pocket/pocket-icons.constants";
import { POCKET_ICON_TYPES } from "@/shared/enums/pocket/pocket-icons.enums";
import React, { useState } from "react";

const CustomIconSelector = ({
  onIconTypeChange,
}: {
  onIconTypeChange: (icon: POCKET_ICON_TYPES) => void;
}) => {
  const [selected, setSelected] = useState<POCKET_ICON_TYPES>(
    POCKET_ICON_TYPES.SAVINGS,
  );

  const handleSelect = (icon: POCKET_ICON_TYPES) => {
    setSelected(icon);
    onIconTypeChange(icon);
  };

  return (
    <div className="w-full border border-primary/10 rounded-4xl overflow-hidden">
      <div className="w-full h-32 flex justify-center flex-wrap p-2 gap-2 overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full">
        {Object.values(POCKET_ICONS).map((item) => (
          <div
            className={`${item.label === selected ? "bg-primary" : "bg-transparent"} w-fit h-fit p-2 bg-background cursor-pointer rounded-lg`}
            key={item.label}
            onClick={() => handleSelect(item.label as POCKET_ICON_TYPES)}
          >
            {React.cloneElement(item.icon as React.ReactElement, {
              color: item.label === selected ? "white" : "currentColor",
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomIconSelector;
