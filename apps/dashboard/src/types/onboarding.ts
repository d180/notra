import type * as z from "zod";
import type { ONBOARDING_HEARD_ABOUT_NOTRA_SOURCES } from "@/constants/onboarding";
import type { onboardingWorkspaceSchema } from "@/schemas/onboarding/workspace";

export type OnboardingHeardAboutNotraSource =
  (typeof ONBOARDING_HEARD_ABOUT_NOTRA_SOURCES)[number];

export interface OnboardingAttributionValue {
  heardAboutNotraSource: OnboardingHeardAboutNotraSource | "" | null;
  heardAboutNotraOther?: string | null;
}

export type OnboardingWorkspaceInput = z.infer<
  typeof onboardingWorkspaceSchema
>;

export interface OnboardingExistingOrg {
  heardAboutNotraOther: string | null;
  heardAboutNotraSource: string | null;
  id: string;
  slug: string;
  name: string;
}

export interface WorkspaceFormProps {
  existingOrg?: OnboardingExistingOrg;
}

export interface OnboardingWorkspaceFormValues {
  heardAboutNotraOther: string;
  heardAboutNotraSource: string;
  name: string;
  slug: string;
  websiteUrl: string;
}

export interface SubmitWorkspaceFormArgs {
  existingOrg?: OnboardingExistingOrg;
  value: OnboardingWorkspaceFormValues;
}

export type SaveOnboardingAttributionInput = Pick<
  OnboardingWorkspaceInput,
  "heardAboutNotraOther" | "heardAboutNotraSource"
> & {
  organizationId: string;
};

export type SaveOnboardingAttributionResult =
  | { success: true }
  | { success: false; error: string };
