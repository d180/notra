// biome-ignore lint/performance/noNamespaceImport: Zod recommended way to import
import * as z from "zod";
import {
  ONBOARDING_HEARD_ABOUT_NOTRA_OPTIONS,
  type OnboardingHeardAboutNotraSource,
} from "@/constants/onboarding";
import {
  organizationNameSchema,
  organizationSlugSchema,
} from "@/schemas/organization";
import { optionalPublicWebsiteUrlSchema } from "@/schemas/url";

const heardAboutNotraSourceValues = ONBOARDING_HEARD_ABOUT_NOTRA_OPTIONS.map(
  (option) => option.value
) as [OnboardingHeardAboutNotraSource, ...OnboardingHeardAboutNotraSource[]];

const heardAboutNotraSourceSchema = z.union([
  z.enum(heardAboutNotraSourceValues),
  z.literal(""),
  z.null(),
]);

export const onboardingWorkspaceFieldsSchema = z.object({
  name: organizationNameSchema,
  slug: organizationSlugSchema,
  websiteUrl: optionalPublicWebsiteUrlSchema,
  heardAboutNotraSource: heardAboutNotraSourceSchema,
  heardAboutNotraOther: z.string().trim().max(120).optional(),
});

export const onboardingWorkspaceAttributionSchema =
  onboardingWorkspaceFieldsSchema
    .pick({
      heardAboutNotraOther: true,
      heardAboutNotraSource: true,
    })
    .superRefine((value, ctx) => {
      if (
        value.heardAboutNotraSource === "other" &&
        !value.heardAboutNotraOther?.trim()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please share where you heard about Notra",
          path: ["heardAboutNotraOther"],
        });
      }
    })
    .transform((value) => ({
      ...value,
      heardAboutNotraSource: value.heardAboutNotraSource || null,
      heardAboutNotraOther:
        value.heardAboutNotraSource === "other"
          ? value.heardAboutNotraOther?.trim() || ""
          : "",
    }));

export const onboardingWorkspaceSchema = onboardingWorkspaceFieldsSchema
  .superRefine((value, ctx) => {
    if (
      value.heardAboutNotraSource === "other" &&
      !value.heardAboutNotraOther?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please share where you heard about Notra",
        path: ["heardAboutNotraOther"],
      });
    }
  })
  .transform((value) => ({
    ...value,
    heardAboutNotraSource: value.heardAboutNotraSource || null,
    heardAboutNotraOther:
      value.heardAboutNotraSource === "other"
        ? value.heardAboutNotraOther?.trim() || ""
        : "",
  }));

export type OnboardingWorkspaceInput = z.infer<
  typeof onboardingWorkspaceSchema
>;
