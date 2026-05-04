import { ISignUpSteps } from "@/shared/interface/stepper/SignUpSteps.interface";
import React from "react";

export const SIGN_UP_STEPS: ISignUpSteps[] = [
  {
    header: "Create your account",
    subHeader:
      "Let's start with the basics. Please enter your account credentials.",
    component: React.lazy(() => import("@/components/forms/SignUpForm")),
  },
  {
    header: "What are you saving for?",
    subHeader:
      "Define your first financial goal. We'll help you track your progress and stay on track.",
    component: React.lazy(
      () => import("@/components/forms/goal-pocket/GoalsForm"),
    ),
  },
  {
    header: "Organize your wealth",
    subHeader:
      "Pockets help your separate your savings, bills and fun money. Choose how'd you like to start.",
    component: React.lazy(
      () => import("@/components/forms/goal-pocket/PocketForm"),
    ),
  },
  /*
  {
    header: "Link your Revolut account",
    subHeader:
      "Connect Sena with your Revolut account to automatically sync your transactions and balances. Don't worry, we use read-only access to keep your data safe.",
    component: React.lazy(
      () => import("@/components/forms/"),
    ),
  },
  */
];
