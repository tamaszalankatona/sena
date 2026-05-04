"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { POCKET_STATUS_CONFIG } from "@/shared/constants/pocket/pocket-status-config.constants";
import { POCKET_STATUSES } from "@/shared/enums/pocket/pocket-statuses.enums";
import { IPocketDetailCard } from "@/shared/interface/pocket/PocketDetailCard.interface";

const SinglePocketDetailsCard = ({ label, value }: IPocketDetailCard) => {
  return (
    <Card className="w-full py-3 gap-1 rounded-xl">
      <CardHeader>
        <CardTitle className="text-xs font-light">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-start items-center">
        {label === "Status" && (
          <span
            className="mr-1"
            style={{
              color: POCKET_STATUS_CONFIG[value as POCKET_STATUSES]?.color,
            }}
          >
            {POCKET_STATUS_CONFIG[value as POCKET_STATUSES]?.icon}
          </span>
        )}

        <h2
          className="text-sm font-medium"
          style={{
            color: POCKET_STATUS_CONFIG[value as POCKET_STATUSES]?.color,
          }}
        >
          {value}
        </h2>
      </CardContent>
    </Card>
  );
};

export default SinglePocketDetailsCard;
