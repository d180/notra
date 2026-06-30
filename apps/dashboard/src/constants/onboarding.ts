export const ONBOARDING_IMPORT_COUNT = 10;

export const ONBOARDING_WEBSITE_TOP_LEVEL_DOMAIN_REGEX = /^[a-z]{2,63}$/i;
export const ONBOARDING_WEBSITE_IPV4_REGEX = /^\d{1,3}(?:\.\d{1,3}){3}$/;
export const ONBOARDING_WEBSITE_IPV6_REGEX = /^[0-9a-f:]+$/i;
export const ONBOARDING_WEBSITE_PREFIX_REGEX = /^https?:\/\//i;

export const ONBOARDING_HEARD_ABOUT_NOTRA_OPTIONS = [
  { label: "X / Twitter", value: "x" },
  { label: "GitHub", value: "github" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Google", value: "search" },
  { label: "Blog or newsletter", value: "blog_or_newsletter" },
  { label: "Friend or colleague", value: "friend_or_colleague" },
  { label: "Other", value: "other" },
] as const;

export type OnboardingHeardAboutNotraSource =
  (typeof ONBOARDING_HEARD_ABOUT_NOTRA_OPTIONS)[number]["value"];

const ONBOARDING_HEARD_ABOUT_NOTRA_LABELS = new Map<string, string>(
  ONBOARDING_HEARD_ABOUT_NOTRA_OPTIONS.map((option) => [
    option.value,
    option.label,
  ])
);

export function getHeardAboutNotraLabel(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return ONBOARDING_HEARD_ABOUT_NOTRA_LABELS.get(value) ?? value;
}
