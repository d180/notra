// biome-ignore lint/performance/noNamespaceImport: Zod recommended way of importing
import * as z from "zod";

const REPO_HOST_REGEX = /^https?:\/\/(www\.)?github\.com\/.+/i;

export const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 1000;
export const ASSET_NEEDS_MIN_LENGTH = 20;
const ASSET_NEEDS_MAX_LENGTH = 1000;

export const ossProgramApplicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little too long."),
  email: z.email("Enter a valid email address."),
  projectName: z
    .string()
    .trim()
    .min(2, "Please enter your project name.")
    .max(80, "That project name is a little too long."),
  repositoryUrl: z
    .url("Enter a valid repository URL.")
    .refine(
      (value) => REPO_HOST_REGEX.test(value),
      "Use a public GitHub repository URL."
    ),
  description: z
    .string()
    .trim()
    .min(
      DESCRIPTION_MIN_LENGTH,
      `Tell us a little more, at least ${DESCRIPTION_MIN_LENGTH} characters.`
    )
    .max(
      DESCRIPTION_MAX_LENGTH,
      `Please keep this under ${DESCRIPTION_MAX_LENGTH} characters.`
    ),
  assetNeeds: z
    .string()
    .trim()
    .min(
      ASSET_NEEDS_MIN_LENGTH,
      `Tell us how Notra would help, at least ${ASSET_NEEDS_MIN_LENGTH} characters.`
    )
    .max(
      ASSET_NEEDS_MAX_LENGTH,
      `Please keep this under ${ASSET_NEEDS_MAX_LENGTH} characters.`
    ),
  isMaintainer: z.literal(true, {
    error: "You must be an owner or maintainer to apply.",
  }),
});
