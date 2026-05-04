import { POCKET_STATUSES } from "@/shared/enums/pocket/pocket-statuses.enums";
import {
  RiPlayCircleLine,
  RiPauseCircleLine,
  RiCheckboxCircleLine,
  RiArchiveLine,
  RiTimeLine,
} from "@remixicon/react";
import React from "react";

export const POCKET_STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  [POCKET_STATUSES.ACTIVE]: {
    label: "Active",
    color: "#16a34a",
    icon: <RiPlayCircleLine color="#16a34a" size={16} />,
  },
  [POCKET_STATUSES.PAUSED]: {
    label: "Paused",
    color: "#d97706",
    icon: <RiPauseCircleLine color="#d97706" size={16} />,
  },
  [POCKET_STATUSES.COMPLETED]: {
    label: "Completed",
    color: "#2563eb",
    icon: <RiCheckboxCircleLine color="#2563eb" size={16} />,
  },
  [POCKET_STATUSES.ARCHIVED]: {
    label: "Archived",
    color: "#6b7280",
    icon: <RiArchiveLine color="#6b7280" size={16} />,
  },
  [POCKET_STATUSES.PENDING]: {
    label: "Pending",
    color: "#9333ea",
    icon: <RiTimeLine color="#9333ea" size={16} />,
  },
};
