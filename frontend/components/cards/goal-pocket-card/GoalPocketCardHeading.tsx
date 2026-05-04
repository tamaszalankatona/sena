"use client";
import { RiTargetLine } from "@remixicon/react";
import React from "react";
import { CardTitle } from "../../ui/card";
import { GOALS_POCKET_CARD_TYPES } from "@/shared/enums/card-types.enums";
import { POCKET_ICONS } from "@/shared/constants/pocket/pocket-icons.constants";
import { POCKET_ICON_TYPES } from "@/shared/enums/pocket/pocket-icons.enums";

const CardHeading = ({
  cardType,
  cardTitle,
  isPreview = false,
  icon = POCKET_ICONS.Savings.label,
}: {
  cardType: GOALS_POCKET_CARD_TYPES;
  cardTitle: string;
  isPreview?: boolean;
  icon: string;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          {isPreview && <p className="text-xs font-heading">Preview</p>}

          <CardTitle className="font-bold text-xl">{cardTitle}</CardTitle>
        </div>
        <div className="bg-primary rounded-lg p-2">
          {cardType === GOALS_POCKET_CARD_TYPES.GOALS_CARD && (
            <RiTargetLine color="white" />
          )}
          {cardType === GOALS_POCKET_CARD_TYPES.POCKET_CARD &&
            React.cloneElement(
              POCKET_ICONS[icon as POCKET_ICON_TYPES]
                ?.icon as React.ReactElement,
              { color: "white" },
            )}
        </div>
      </div>
    </>
  );
};

export default CardHeading;
