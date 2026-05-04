"use client";
import Logo from "@/components/logo/Logo";
import Stepper from "@/components/stepper/Stepper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUpNavigation } from "@/shared/hooks/useSignUpNavigation.hooks";
import React from "react";

const SignUpCardContainer = ({
  children,
  header,
  subHeader,
}: {
  children: React.ReactNode;
  header: string;
  subHeader: string;
}) => {
  const { currentStep } = useSignUpNavigation();
  return (
    <div
      className={`flex flex-col sm:flex-row justify-center items-start space-y-8 ${currentStep === 0 ? "col-start-3 col-end-9" : "col-start-1 col-end-7"}  h-full md:mt-10`}
    >
      <Card className="rounded-none w-full h-full sm:h-fit md:rounded-4xl sm:flex sm:justify-start sm:items-center">
        <CardHeader className="w-full">
          <div className="w-full flex justify-between items-center">
            <Logo showFullLogo />
            <Stepper />
          </div>
          <CardTitle className="mt-5">{header}</CardTitle>
          <CardDescription>{subHeader}</CardDescription>
        </CardHeader>
        <CardContent className="w-full">{children}</CardContent>
      </Card>
    </div>
  );
};

export default SignUpCardContainer;
