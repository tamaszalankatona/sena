"use client";
import useSignUpDetailsStore from "@/store/SignUpDetails.store";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CardHeading from "../GoalPocketCardHeading";
import { GOALS_POCKET_CARD_TYPES } from "@/shared/enums/card-types.enums";
import InfoCard from "../../info-card/InfoCard";
import PocketDetailsCardContainer from "./PocketDetailsCardContainer";

const PocketCard = () => {
  const usePocketDetails = useSignUpDetailsStore(
    (state) => state.signUpDetails.pocket,
  );
  const alreadySavedAmount: string = (
    usePocketDetails?.alreadySavedAmount ?? 0
  ).toLocaleString();

  return (
    <Card className="min-w-full bg-white border border-primary/10 sm:w-8/12 md:w-7/12 lg:w-5/12 2xl:w-4/12">
      <CardHeader>
        <CardHeading
          cardType={GOALS_POCKET_CARD_TYPES.POCKET_CARD}
          cardTitle={usePocketDetails?.pocketName ?? "Your Pocket"}
          isPreview={true}
          icon={usePocketDetails?.icon}
        />
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-col space-y-4">
        <div className="w-full text-left">
          <p className="text-sm">Saved so far</p>
          <h2 className="text-xl font-bold">
            {usePocketDetails?.currency} {alreadySavedAmount}
          </h2>
        </div>

        <PocketDetailsCardContainer />
      </CardContent>
      <CardFooter className="w-full mt-4">
        <InfoCard contentText="Pockets are sub-accounts with a unique identity, shareable with up to 5 members." />
      </CardFooter>
    </Card>
  );
};

export default PocketCard;
