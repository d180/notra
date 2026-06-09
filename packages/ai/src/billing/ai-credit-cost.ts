import type { AgentTokenUsage } from "../types/agents";
import type { AiCreditCostResult } from "../types/billing";
import { calculateTokenCostCents, MARKUP_PERCENT } from "./token-pricing";

const MINIMUM_COST_CENTS = 1;
const MARKUP_MULTIPLIER = 1 + MARKUP_PERCENT / 100;

export function calculateAiCreditCostCents(
  usage: AgentTokenUsage,
  modelId?: string,
  applyMarkup = true
): AiCreditCostResult {
  const tokenCostCents = calculateTokenCostCents(usage, modelId, applyMarkup);

  if (
    typeof usage.totalUsd === "number" &&
    Number.isFinite(usage.totalUsd) &&
    usage.totalUsd > 0
  ) {
    const multiplier = applyMarkup ? MARKUP_MULTIPLIER : 1;
    const reportedCostCents = Math.max(
      Math.ceil(usage.totalUsd * multiplier * 100),
      MINIMUM_COST_CENTS
    );

    return {
      costCents: reportedCostCents,
      billingBasis: "reported_total_usd",
      reportedCostCents,
      tokenCostCents,
    };
  }

  return {
    costCents: tokenCostCents,
    billingBasis: "tokens",
    tokenCostCents,
  };
}
