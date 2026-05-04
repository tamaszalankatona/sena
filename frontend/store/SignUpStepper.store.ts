import { create } from "zustand";

const useSignupStepperStore = create((set) => ({
  step: 0,
  increaseStep: () => set((state) => ({ step: state.step + 1 })),
  decreaseStep: () => set((state) => ({ step: state.step - 1 })),
}));

export default useSignupStepperStore;
