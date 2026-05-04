"use client";
import useSignUpDetailsStore from "@/store/SignUpDetails.store";
import SinglePocketDetailsCard from "./SinglePocketDetailsCard";
import { IPocketDetailCard } from "@/shared/interface/pocket/PocketDetailCard.interface";

const PocketDetailsCardContainer = () => {
  const pocketUnderCreation = useSignUpDetailsStore(
    (state) => state.signUpDetails.pocket,
  );

  const detailCards: IPocketDetailCard[] = [
    {
      label: "Status",
      value: pocketUnderCreation?.status,
    },
    {
      label: "Type",
      value: pocketUnderCreation?.type,
    },
    {
      label: "Members",
      value: pocketUnderCreation?.members?.length
        ? `${pocketUnderCreation.members.length} members`
        : undefined,
    },
  ];

  return (
    <div className="w-full flex justify-between items-center sm:space-x-4">
      {detailCards
        .filter((card) => card.value !== undefined)
        .map((card) => (
          <SinglePocketDetailsCard
            key={card.label}
            label={card.label}
            value={card.value}
          />
        ))}
    </div>
  );
};

export default PocketDetailsCardContainer;
