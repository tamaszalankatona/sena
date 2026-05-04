"use client";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  RiLockLine,
  RiMailLine,
  RiUserLine,
  RiEyeOffLine,
  RiEyeLine,
} from "@remixicon/react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import useSignupStepperStore from "@/store/SignUpStepper.store";
import useSignUpDetailsStore from "@/store/SignUpDetails.store";

const formSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const increaseStep = useSignupStepperStore((state) => state.increaseStep);
  const setUserDetails = useSignUpDetailsStore((state) => state.setUserDetails);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      password: "asdasdasd",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setUserDetails({
      name: data.username,
      email: data.email,
      password: data.password,
    });

    increaseStep();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="John Doe"
                ></InputGroupInput>
                <InputGroupAddon align="inline-start">
                  <RiUserLine />
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
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="johndoe@example.com"
                ></InputGroupInput>
                <InputGroupAddon align="inline-start">
                  <RiMailLine />
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="password"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="••••••••"
                  {...(showPassword && { type: "text" })}
                ></InputGroupInput>
                <InputGroupAddon align="inline-start">
                  <RiLockLine />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
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
        <Field orientation="vertical">
          <Button type="submit" variant="default" className="w-full">
            Next
          </Button>
          <Button variant="outline" className="w-full">
            Back
          </Button>
          <span className="text-center">
            Dont have an account? <Button variant="link">Sign In</Button>
          </span>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignUpForm;
