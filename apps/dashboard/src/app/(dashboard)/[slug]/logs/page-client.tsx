"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useOrganizationsContext } from "@/components/providers/organization-provider";
import { LogsPageSkeleton } from "./skeleton";
import { Alert, AlertDescription } from "@notra/ui/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import type { LogsResponse } from "@/types/webhook-logs";
import { QUERY_KEYS } from "@/utils/query-keys";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface PageClientProps {
  organizationSlug: string;
}

export default function PageClient({ organizationSlug }: PageClientProps) {
  const { getOrganization } = useOrganizationsContext();
  const organization = getOrganization(organizationSlug);
  const organizationId = organization?.id;

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.WEBHOOK_LOGS.list(organizationId ?? "", page),
    queryFn: async () => {
      if (!organizationId) {
        throw new Error("Organization ID is required");
      }
      const response = await fetch(
        `/api/organizations/${organizationId}/webhook-logs?integrationType=github&integrationId=all&page=${page}&pageSize=10`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch webhook logs");
      }

      const result = await response.json();
      return result as LogsResponse;
    },
    enabled: !!organizationId,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="w-full space-y-6 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl tracking-tight">Logs</h1>
          <p className="text-muted-foreground">
            View all integration events and their delivery status
          </p>
        </div>

        <Alert>
          <HugeiconsIcon className="size-4" icon={InformationCircleIcon} />
          <AlertDescription>
            Log data is retained for 7 days. Older entries are automatically
            removed.
          </AlertDescription>
        </Alert>

        {organizationId && isLoading ? (
          <LogsPageSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data?.logs ?? []}
            onPageChange={setPage}
            page={page}
            totalPages={data?.pagination.totalPages ?? 1}
          />
        )}
      </div>
    </div>
  );
}
