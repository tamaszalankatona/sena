"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../../../ui/card";
import InfoCard from "../../info-card/InfoCard";
import CardHeading from "../GoalPocketCardHeading";
import useSignUpDetailsStore from "@/store/SignUpDetails.store";
import { calculateMonthsFromCurrentDate } from "@/shared/utils/goals/calculateMonthsFromCurrentDate.utils";
import { calculateAchievedPercentage } from "@/shared/utils/goals/calculateAchievedPercentage.utils";
import { GOALS_POCKET_CARD_TYPES } from "@/shared/enums/card-types.enums";
import Image from "next/image";

const GoalsCard = () => {
  const useGoalDetails = useSignUpDetailsStore(
    (state) => state.signUpDetails.goals,
  );
  const alreadyAchievedPercentage: number = calculateAchievedPercentage(
    useGoalDetails?.alreadySavedAmount ?? 0,
    useGoalDetails?.goalAmount ?? 0,
  );
  const monthsLeft: number = calculateMonthsFromCurrentDate(
    useGoalDetails?.deadline,
  );
  const alreadySavedAmount: string = (
    useGoalDetails?.alreadySavedAmount ?? 0
  ).toLocaleString();
  const goalAmount: string = (useGoalDetails?.goalAmount ?? 0).toLocaleString();

  return (
    <div className="flex flex-col justify-center items-center md:items-start space-y-4 w-full h-full">
      <Card className="w-full bg-white border border-primary/10">
        <CardHeader>
          <CardHeading
            cardType={GOALS_POCKET_CARD_TYPES.GOALS_CARD}
            cardTitle={`${useGoalDetails?.goalName ?? "Your Goal"}`}
            isPreview={true}
          />
        </CardHeader>
        <CardContent className="flex justify-between items-center flex-col space-y-4">
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-sm">Saved so far</p>
              <h2 className="text-xl font-bold">
                {useGoalDetails?.currency} {alreadySavedAmount}
              </h2>
            </div>
            <div>
              <p className="text-sm">Target</p>
              <h2 className="text-sm font-semibold">
                {useGoalDetails?.currency} {goalAmount}
              </h2>
            </div>
          </div>
          <div className="min-w-full h-3 sm:w-5/12 lg:w-6/12 bg-zinc-50 rounded-4xl">
            <div
              className="max-w-full h-3 bg-primary rounded-4xl transition-all duration-300"
              style={{
                width: `${alreadyAchievedPercentage}%`,
              }}
            ></div>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-xs font-bold text-primary">
              {alreadyAchievedPercentage}% ACHIEVED
            </p>
            <p className="text-xs font-bold text-primary">
              {monthsLeft} MONTHS LEFT
            </p>
          </div>
        </CardContent>
        <CardFooter className="w-full mt-4">
          <InfoCard contentText="Saving $2100/mo will help you reach this goal by your deadline." />
        </CardFooter>
      </Card>
      <div className="relative min-w-full h-48 rounded-4xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1690321607822-669326f4e3cc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="visualize your success"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end p-4"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))",
          }}
        >
          <h3 className="text-white font-bold text-lg">
            Visualize your success
          </h3>
          <p className="text-white/70 text-sm">
            Upload a custom image later to keep you motivated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalsCard;
