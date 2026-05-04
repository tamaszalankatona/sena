import { IGoals } from "@/shared/interface/goals/Goals.interface";
import { IPocket } from "@/shared/interface/pocket/Pockets.interface";
import { IUserDetails } from "@/shared/interface/user-details/UserDetails.interface";
import { create } from "zustand/react";

interface ISignUpDetailsState {
  userDetails: IUserDetails;
  goals: IGoals;
  pockets: IPocket;
}

const useSignUpDetailsStore = create((set) => ({
  signUpDetails: {} as ISignUpDetailsState,
  setUserDetails: (userDetails: IUserDetails) =>
    set((state) => ({
      signUpDetails: {
        ...state.signUpDetails,
        userDetails,
      },
    })),
  setGoals: (goals: IGoals) =>
    set((state) => ({
      signUpDetails: {
        ...state.signUpDetails,
        goals,
      },
    })),
  setPockets: (pocket: IPocket) =>
    set((state) => ({
      signUpDetails: {
        ...state.signUpDetails,
        pocket,
      },
    })),
}));

export default useSignUpDetailsStore;
