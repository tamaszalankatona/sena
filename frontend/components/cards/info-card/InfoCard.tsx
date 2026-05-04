"use client";
import { Card, CardContent } from "@/components/ui/card";
import { RiInformationFill } from "@remixicon/react";

const InfoCard = ({ contentText }: { contentText: string }) => {
  return (
    <Card className="w-md py-4">
      <CardContent className="flex justify-between items-start space-x-2">
        <RiInformationFill className="shrink-0" color="#0e51d3" size={20} />
        <p className="text-xs">{contentText}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
