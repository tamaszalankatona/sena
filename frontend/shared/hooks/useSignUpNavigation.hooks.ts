import useSignupStepperStore from "@/store/SignUpStepper.store";
import { SIGN_UP_STEPS } from "../constants/steppers/sign-up-steps.constants";

export const useSignUpNavigation = () => {
  const increaseStep = useSignupStepperStore((state) => state.increaseStep);
  const decreaseStep = useSignupStepperStore((state) => state.decreaseStep);
  const currentStep = useSignupStepperStore((state) => state.step);
  const isLastStep = currentStep === SIGN_UP_STEPS.length - 1;

  return { increaseStep, decreaseStep, currentStep, isLastStep };
};
