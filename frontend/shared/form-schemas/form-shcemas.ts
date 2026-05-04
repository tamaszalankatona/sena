import z from "zod";
import { CURRENCIES } from "../enums/currencies.enums";
import { POCKET_STATUSES } from "../enums/pocket/pocket-statuses.enums";
import { POCKET_TYPES } from "../enums/pocket/pocket-types.enums";

export const pocketFormSchema = z.object({
  pocketName: z.string().min(3).max(255),
  alreadySavedAmount: z.coerce.number().min(0),
  status: z.enum(POCKET_STATUSES).default(POCKET_STATUSES.ACTIVE),
  type: z.enum(POCKET_TYPES).default(POCKET_TYPES.INDIVIDUAL),
  icon: z.string().default("SAVINGS"),
  currency: z.enum(CURRENCIES).default(CURRENCIES.EUR),
});

export const goalFormSchema = z.object({
  goalName: z.string().min(3).max(255),
  targetAmount: z.coerce.number().min(1),
  alreadySavedAmount: z.coerce.number().min(0),
  targetDeadline: z.string().min(1),
  currency: z.enum(CURRENCIES).default(CURRENCIES.EUR),
});
