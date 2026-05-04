import { POCKET_ICON_TYPES } from "@/shared/enums/pocket/pocket-icons.enums";
import { POCKET_STATUSES } from "@/shared/enums/pocket/pocket-statuses.enums";
import { POCKET_TYPES } from "@/shared/enums/pocket/pocket-types.enums";

export interface IPocket {
  pocketName: string;
  alreadySavedAmount: number;
  pocketType: POCKET_TYPES;
  status: POCKET_STATUSES;
  icon: POCKET_ICON_TYPES;
  currency: string;
}
