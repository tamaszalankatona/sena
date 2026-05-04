"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { POCKET_TYPES } from "@/shared/enums/pocket/pocket-types.enums";
import { RiUserLine, RiCheckLine, RiGroupLine } from "@remixicon/react";

interface IPocketCardProps {
  pocketType: POCKET_TYPES;
  selected: boolean;
  setSelected: (pocketType: POCKET_TYPES) => void;
}

const SelectPocketTypeSingleCard = ({
  pocketType,
  selected,
  setSelected,
}: IPocketCardProps) => {
  return (
    <Card
      onClick={() => {
        setSelected(pocketType);
      }}
      className="w-full border-2 max-h-fit cursor-pointer gap-2"
      style={{
        border: `2px solid ${selected ? "#007a55" : "transparent"}`,
        background: selected ? "#007a5505" : "white",
      }}
    >
      <CardHeader>
        <CardTitle>
          <div
            className="w-fit bg-accent p-2 rounded-lg"
            style={{ background: `${selected ? "#007a55" : "#ffffff1a"}` }}
          >
            {pocketType === POCKET_TYPES.INDIVIDUAL ? (
              <RiUserLine color={`${selected ? `white` : `#737373`}`} />
            ) : (
              <RiGroupLine color={`${selected ? `white` : `#737373`}`} />
            )}
          </div>
        </CardTitle>
        <CardAction
          className={`${selected ? "bg-primary" : "bg-transparent"} rounded-4xl p-1`}
        >
          <RiCheckLine color={selected ? "white" : "transparent"} size={12} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <h2 className="font-bold mb-1">
          {pocketType === POCKET_TYPES.INDIVIDUAL
            ? "Individual Pocket"
            : "Shared Pocket"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {pocketType === POCKET_TYPES.INDIVIDUAL
            ? "Just for you. Manage your personal pockets and spending"
            : "Share with others. Manage group pockets and spending"}
        </p>
      </CardContent>
    </Card>
  );
};

export default SelectPocketTypeSingleCard;
