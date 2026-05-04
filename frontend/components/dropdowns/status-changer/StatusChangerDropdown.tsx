"use client";
import { RiArrowDownSLine } from "@remixicon/react";
import { Button } from "../../ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenu,
} from "../../ui/dropdown-menu";
import { POCKET_STATUS_CONFIG } from "@/shared/constants/pocket/pocket-status-config.constants";
import { POCKET_STATUSES } from "@/shared/enums/pocket/pocket-statuses.enums";

const StatusChangerDropdown = ({
  status,
  setStatus,
  mapStatusesFrom,
}: {
  setStatus: (status: string) => void;
  status: string;
  mapStatusesFrom: Record<string, string>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span
            style={{
              color: POCKET_STATUS_CONFIG[status as POCKET_STATUSES]?.color,
            }}
          >
            {POCKET_STATUS_CONFIG[status as POCKET_STATUSES]?.icon}
          </span>
          <span
            style={{
              color: POCKET_STATUS_CONFIG[status as POCKET_STATUSES]?.color,
            }}
          >
            {status}
          </span>
          <RiArrowDownSLine
            style={{
              color: POCKET_STATUS_CONFIG[status as POCKET_STATUSES]?.color,
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Statuses</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
            {Object.values(mapStatusesFrom).map((status) => (
              <DropdownMenuRadioItem key={status} value={status}>
                <span
                  style={{
                    color:
                      POCKET_STATUS_CONFIG[status as POCKET_STATUSES]?.color,
                  }}
                >
                  {POCKET_STATUS_CONFIG[status as POCKET_STATUSES]?.icon}
                </span>
                {status}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusChangerDropdown;
