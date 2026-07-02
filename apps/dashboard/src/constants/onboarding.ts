import type { OnboardingHeardAboutNotraSource } from "@/types/onboarding";

export const ONBOARDING_IMPORT_COUNT = 10;

export const ONBOARDING_WEBSITE_TOP_LEVEL_DOMAIN_REGEX = /^[a-z]{2,63}$/i;
export const ONBOARDING_WEBSITE_IPV4_REGEX = /^\d{1,3}(?:\.\d{1,3}){3}$/;
export const ONBOARDING_WEBSITE_IPV6_REGEX = /^[0-9a-f:]+$/i;
export const ONBOARDING_WEBSITE_PREFIX_REGEX = /^https?:\/\//i;

export const ONBOARDING_HEARD_ABOUT_NOTRA_SOURCES = [
  "x",
  "github",
  "linkedin",
  "search",
  "blog_or_newsletter",
  "friend_or_colleague",
  "other",
] as const;

export const ONBOARDING_HEARD_ABOUT_NOTRA_LABELS: Record<
  OnboardingHeardAboutNotraSource,
  string
> = {
  x: "X / Twitter",
  github: "GitHub",
  linkedin: "LinkedIn",
  search: "Google",
  blog_or_newsletter: "Blog or newsletter",
  friend_or_colleague: "Friend or colleague",
  other: "Other",
};

export const ONBOARDING_HEARD_ABOUT_NOTRA_OPTIONS =
  ONBOARDING_HEARD_ABOUT_NOTRA_SOURCES.map((value) => ({
    label: ONBOARDING_HEARD_ABOUT_NOTRA_LABELS[value],
    value,
  }));
