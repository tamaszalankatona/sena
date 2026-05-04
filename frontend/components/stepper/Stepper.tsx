"use client";

import { SIGN_UP_STEPS } from "@/shared/constants/steppers/sign-up-steps.constants";
import useSignupStepperStore from "@/store/SignUpStepper.store";

const Stepper = () => {
  const currentStep = useSignupStepperStore((state) => state.step);

  return (
    <div className="sm:w-7/12 lg:w-5/12 sm:flex sm:justify-center sm:items-center sm:space-x-2">
      <p className="w-fit lg:w-6/12 pb-1 sm:pb-0">
        Step {currentStep + 1} of {SIGN_UP_STEPS.length}
      </p>
      <div className="h-2 sm:w-5/12 lg:w-6/12 w-full bg-zinc-50 rounded">
        <div
          className="h-2 bg-primary rounded transition-all duration-300"
          style={{
            width: `${((currentStep + 1) / SIGN_UP_STEPS.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
