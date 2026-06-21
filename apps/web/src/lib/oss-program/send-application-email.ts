import { createHash } from "node:crypto";
import { OssApplicationEmail } from "@notra/email/emails/oss-application";
import type { OssApplicationEmailProps } from "@notra/email/types/oss-application";
import { EMAIL_CONFIG } from "@notra/email/utils/config";
import { sendDevEmail } from "@notra/email/utils/dev";
import { getResend } from "@notra/email/utils/resend";
import { Data, Effect } from "effect";

class OssApplicationEmailError extends Data.TaggedError(
  "OssApplicationEmailError"
)<{
  readonly message: string;
  readonly cause: unknown;
}> {}

function getRecipient(): string {
  return (
    process.env.OSS_PROGRAM_EMAIL_TO ||
    process.env.FEEDBACK_EMAIL_TO ||
    EMAIL_CONFIG.replyTo
  );
}

function buildPlainText(application: OssApplicationEmailProps): string {
  return [
    `From: ${application.name} <${application.email}>`,
    `Project: ${application.projectName}`,
    `Repository: ${application.repositoryUrl}`,
    "",
    application.description,
    application.assetNeeds ? `\nAsset needs:\n${application.assetNeeds}` : "",
  ].join("\n");
}

function buildIdempotencyKey(
  application: OssApplicationEmailProps,
  recipient: string
): string {
  const hash = createHash("sha256");

  for (const value of [
    recipient,
    application.name,
    application.email,
    application.projectName,
    application.repositoryUrl,
    application.description,
    application.assetNeeds ?? "",
  ]) {
    hash.update(value);
    hash.update("\0");
  }

  return `notra:oss-program:${hash.digest("hex")}`;
}

export const sendOssApplicationEmail = Effect.fn("sendOssApplicationEmail")(
  function* (application: OssApplicationEmailProps) {
    const to = getRecipient();
    const subject = `OSS program application: ${application.projectName}`;
    const idempotencyKey = buildIdempotencyKey(application, to);

    const resend = getResend();

    if (!resend) {
      if (process.env.NODE_ENV === "production") {
        return yield* Effect.fail(
          new OssApplicationEmailError({
            message: "Email service is not configured",
            cause: new Error("RESEND_API_KEY is not set"),
          })
        );
      }

      yield* Effect.tryPromise({
        try: () =>
          sendDevEmail({
            from: EMAIL_CONFIG.from,
            to,
            subject,
            text: buildPlainText(application),
          }),
        catch: (cause) =>
          new OssApplicationEmailError({
            message: "Failed to log development email",
            cause,
          }),
      });

      return { success: true } as const;
    }

    const result = yield* Effect.tryPromise({
      try: () =>
        resend.emails.send(
          {
            from: EMAIL_CONFIG.from,
            replyTo: application.email,
            to,
            subject,
            react: OssApplicationEmail(application),
            text: buildPlainText(application),
            tags: [{ name: "category", value: "oss-program" }],
          },
          { idempotencyKey }
        ),
      catch: (cause) =>
        new OssApplicationEmailError({
          message: "Failed to send OSS application email",
          cause,
        }),
    });

    if (result.error) {
      return yield* Effect.fail(
        new OssApplicationEmailError({
          message: result.error.message,
          cause: result.error,
        })
      );
    }

    return { success: true } as const;
  }
);
