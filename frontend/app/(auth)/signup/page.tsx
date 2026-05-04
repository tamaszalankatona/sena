"use client";
import { SIGN_UP_STEPS } from "@/shared/constants/steppers/sign-up-steps.constants";
import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner";
import { Suspense } from "react";
import SignUpCardContainer from "@/components/cards/sign-up/SignUpCardContainer";
import { useSignUpNavigation } from "@/shared/hooks/useSignUpNavigation.hooks";
import SignUpSideContentContainer from "@/components/cards/sign-up/SignUpSideContentContainer";

const SignUpPage = () => {
  const { currentStep } = useSignUpNavigation();
  const {
    component: StepComponent,
    header,
    subHeader,
  } = SIGN_UP_STEPS[currentStep];
  return (
    <>
      <SignUpCardContainer header={header} subHeader={subHeader}>
        <Suspense fallback={<LoadingSpinner />}>
          <StepComponent />
        </Suspense>
      </SignUpCardContainer>
      <SignUpSideContentContainer />
    </>
  );
};

export default SignUpPage;
