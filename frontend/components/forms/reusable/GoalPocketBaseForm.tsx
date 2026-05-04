import CurrencyChangerDropdown from "@/components/dropdowns/currency-changer/CurrencyChangerDropdown";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { GOAL_POCKET_FORM_TYPES } from "@/shared/enums/form-types/goal-pocket-form-types.enums";
import { useSignUpNavigation } from "@/shared/hooks/useSignUpNavigation.hooks";
import { RiEditLine, RiMoneyDollarCircleLine } from "@remixicon/react";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const GoalPocketBaseForm = ({
  form,
  onSubmit,
  children,
  formType,
}: {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  formType: GOAL_POCKET_FORM_TYPES;
}) => {
  const { decreaseStep, increaseStep } = useSignUpNavigation();
  const isGoal = formType === GOAL_POCKET_FORM_TYPES.GOAL;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
      <FieldGroup>
        <Controller
          name={isGoal ? "goalName" : "pocketName"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{isGoal ? "Goal Name" : "Pocket Name"}</FieldLabel>
              <InputGroup>
                <InputGroupInput {...field} placeholder="e.g. Emergency Fund" />
                <InputGroupAddon align="inline-start">
                  <RiEditLine />
                </InputGroupAddon>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </InputGroup>
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="alreadySavedAmount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="alreadySavedAmount">
                Already Saved Amount
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="5,000"
                ></InputGroupInput>
                <InputGroupAddon align="inline-start">
                  <RiMoneyDollarCircleLine />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" className="pr-0">
                  <Controller
                    name="currency"
                    control={form.control}
                    render={({ field }) => (
                      <CurrencyChangerDropdown
                        currency={field.value}
                        setCurrency={field.onChange}
                      />
                    )}
                  />
                </InputGroupAddon>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </InputGroup>
            </Field>
          )}
        ></Controller>
      </FieldGroup>

      {children}

      <FieldGroup>
        <Field orientation="vertical">
          <Button
            onClick={increaseStep}
            type="submit"
            variant="default"
            className="w-full"
          >
            Next
          </Button>
          <Button onClick={decreaseStep} variant="outline" className="w-full">
            Back
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default GoalPocketBaseForm;
