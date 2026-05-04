"use client";
import { POCKET_STATUSES } from "@/shared/enums/pocket/pocket-statuses.enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import SelectPocketTypes from "../../cards/goal-pocket-card/pockets/SelectPocketTypes";
import { FieldGroup, Field, FieldLabel, FieldError } from "../../ui/field";
import StatusChangerDropdown from "../../dropdowns/status-changer/StatusChangerDropdown";
import useSignUpDetailsStore from "@/store/SignUpDetails.store";
import { POCKET_TYPES } from "@/shared/enums/pocket/pocket-types.enums";
import { pocketFormSchema } from "@/shared/form-schemas/form-shcemas";
import CustomIconSelector from "../../custom-icon-selector/CustomIconSelector";
import GoalPocketBaseForm from "../reusable/GoalPocketBaseForm";
import { GOAL_POCKET_FORM_TYPES } from "@/shared/enums/form-types/goal-pocket-form-types.enums";
import { CURRENCIES } from "@/shared/enums/currencies.enums";

const PocketForm = () => {
  const setPockets = useSignUpDetailsStore((state) => state.setPockets);
  const useSignUpDetails = useSignUpDetailsStore(
    (state) => state.signUpDetails,
  );
  const savedPocket = useSignUpDetails.pocket;

  const form = useForm<z.infer<typeof pocketFormSchema>>({
    resolver: zodResolver(pocketFormSchema),
    defaultValues: {
      pocketName: savedPocket?.pocketName ?? "Your first pocket",
      alreadySavedAmount: savedPocket?.alreadySavedAmount ?? 5000,
      status: savedPocket?.status ?? POCKET_STATUSES.ACTIVE,
      type: savedPocket?.type ?? POCKET_TYPES.INDIVIDUAL,
      icon: savedPocket?.icon ?? "Savings",
      currency: savedPocket?.currency ?? CURRENCIES.EUR,
    },
  });

  const watchedValues = form.watch();

  function onSubmit(data: z.infer<typeof pocketFormSchema>) {
    console.log("data:", data);
    setPockets({
      pocketName: data.pocketName,
      alreadySavedAmount: data.alreadySavedAmount,
      status: data.status,
      type: data.type,
      icon: data.icon,
      currency: watchedValues.currency,
    });

    //increaseStep();
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (watchedValues.pocketName) {
        setPockets({
          pocketName: watchedValues.pocketName,
          alreadySavedAmount: watchedValues.alreadySavedAmount,
          status: watchedValues.status,
          type: watchedValues.type,
          icon: watchedValues.icon,
          currency: watchedValues.currency,
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    watchedValues.pocketName,
    watchedValues.alreadySavedAmount,
    watchedValues.status,
    watchedValues.type,
    watchedValues.icon,
    watchedValues.currency,
  ]);

  return (
    <GoalPocketBaseForm
      form={form}
      onSubmit={onSubmit}
      formType={GOAL_POCKET_FORM_TYPES.POCKET}
    >
      <FieldGroup>
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="status">Select status</FieldLabel>
              <StatusChangerDropdown
                status={field.value}
                setStatus={field.onChange}
                mapStatusesFrom={POCKET_STATUSES}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="space-y-4">
        <FieldLabel>Select Custom Icon</FieldLabel>
        <CustomIconSelector
          onIconTypeChange={(icon) => form.setValue("icon", icon)}
        />
      </div>

      <div className="space-y-4">
        <FieldLabel>Select Pocket Type</FieldLabel>
        <SelectPocketTypes
          onPocketTypeChange={(type) => form.setValue("type", type)}
        />
      </div>
    </GoalPocketBaseForm>
  );
};

export default PocketForm;
