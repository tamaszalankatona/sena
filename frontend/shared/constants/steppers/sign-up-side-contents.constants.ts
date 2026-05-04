import { ISignUpSideContents } from "@/shared/interface/stepper/SignUpSideContents.interface";
import React from "react";

export const SIGN_UP_SIDE_CONTENTS: ISignUpSideContents[] = [
  {
    component: null,
  },
  {
    component: React.lazy(
      () => import("@/components/cards/goal-pocket-card/goals/GoalsCard"),
    ),
  },
  {
    component: React.lazy(
      () => import("@/components/cards/goal-pocket-card/pockets/PocketCard"),
    ),
  },
  {
    component: null,
  },
];
