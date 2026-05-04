"use client";
import { RiMoneyDollarCircleLine, RiCalendarLine } from "@remixicon/react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUpDetailsStore from "@/store/SignUpDetails.store";
import { useEffect } from "react";
import { CURRENCIES } from "@/shared/enums/currencies.enums";
import { goalFormSchema } from "@/shared/form-schemas/form-shcemas";
import { GOAL_POCKET_FORM_TYPES } from "@/shared/enums/form-types/goal-pocket-form-types.enums";
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
import GoalPocketBaseForm from "../reusable/GoalPocketBaseForm";
import CurrencyChangerDropdown from "@/components/dropdowns/currency-changer/CurrencyChangerDropdown";

const GoalsForm = () => {
  const setGoals = useSignUpDetailsStore((state) => state.setGoals);
  const useSignUpDetails = useSignUpDetailsStore(
    (state) => state.signUpDetails,
  );
  const savedGoal = useSignUpDetails.goals;

  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      goalName: savedGoal?.goalName ?? "Your first goal",
      targetAmount: savedGoal?.goalAmount ?? 5000,
      alreadySavedAmount: savedGoal?.alreadySavedAmount ?? 1000,
      targetDeadline:
        savedGoal?.deadline ?? new Date().toISOString().split("T")[0],
      currency: savedGoal?.currency ?? CURRENCIES.EUR,
    },
  });

  const watchedValues = form.watch();

  function onSubmit(data: z.infer<typeof goalFormSchema>) {
    setGoals({
      goalName: data.goalName,
      goalAmount: data.targetAmount,
      alreadySavedAmount: data.alreadySavedAmount,
      deadline: data.targetDeadline,
      currency: watchedValues.currency,
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (watchedValues.goalName && watchedValues.targetAmount) {
        setGoals({
          goalName: watchedValues.goalName,
          goalAmount: watchedValues.targetAmount,
          alreadySavedAmount: watchedValues.alreadySavedAmount,
          deadline: watchedValues.targetDeadline,
          currency: watchedValues.currency,
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    watchedValues.goalName,
    watchedValues.targetAmount,
    watchedValues.alreadySavedAmount,
    watchedValues.targetDeadline,
    watchedValues.currency,
  ]);

  return (
    <GoalPocketBaseForm
      form={form}
      onSubmit={onSubmit}
      formType={GOAL_POCKET_FORM_TYPES.GOAL}
    >
      <FieldGroup>
        <Controller
          name="targetAmount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="targetAmount">Target Amount</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="5,000"
                  step="0.01"
                ></InputGroupInput>
                <InputGroupAddon align="inline-start">
                  <RiMoneyDollarCircleLine />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" className="pr-0">
                  <Controller
                    name="currency"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <CurrencyChangerDropdown
                          currency={field.value}
                          setCurrency={field.onChange}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
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
      <FieldGroup>
        <Controller
          name="targetDeadline"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="targetDeadline">Target Deadline</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="date"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="mm/dd/yyyy"
                ></InputGroupInput>
                <InputGroupAddon align="inline-start">
                  <RiCalendarLine />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end"></InputGroupAddon>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </InputGroup>
            </Field>
          )}
        ></Controller>
      </FieldGroup>
    </GoalPocketBaseForm>
  );
};

export default GoalsForm;
