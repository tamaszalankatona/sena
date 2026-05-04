"use client";
import { useSignUpNavigation } from "@/shared/hooks/useSignUpNavigation.hooks";
import React, { Suspense } from "react";
import { SIGN_UP_SIDE_CONTENTS } from "@/shared/constants/steppers/sign-up-side-contents.constants";
import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner";

const SignUpSideContentContainer = () => {
  const { currentStep } = useSignUpNavigation();
  const { component: StepComponent } = SIGN_UP_SIDE_CONTENTS[currentStep];

  if (!StepComponent) return null;

  return (
    <div className="hidden md:block md:col-start-7 md:col-end-11 self-start md:mt-10">
      <Suspense fallback={<LoadingSpinner />}>
        <StepComponent />
      </Suspense>
    </div>
  );
};

export default SignUpSideContentContainer;
