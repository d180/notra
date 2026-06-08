import { uploadGeneratedHtmlAsset } from "@notra/ai/utils/image-assets";
import { db } from "@notra/db/drizzle";
import { sql } from "drizzle-orm";

interface ImagePostRow {
  id: string;
  organization_id: string;
  raw_html: string | null;
  source_metadata: Record<string, unknown> | null;
}

function getLegacyHtml(row: ImagePostRow) {
  if (row.raw_html?.trim()) {
    return row.raw_html;
  }

  const artifacts = row.source_metadata?.artifacts;
  if (!artifacts || typeof artifacts !== "object" || Array.isArray(artifacts)) {
    return null;
  }

  const html = (artifacts as { html?: unknown }).html;
  return typeof html === "string" && html.trim() ? html : null;
}

function buildNextMetadata(row: ImagePostRow) {
  const metadata = row.source_metadata ?? {};
  const artifacts =
    metadata.artifacts &&
    typeof metadata.artifacts === "object" &&
    !Array.isArray(metadata.artifacts)
      ? metadata.artifacts
      : {};
  const {
    html: _html,
    svg: _svg,
    ...restArtifacts
  } = artifacts as Record<string, unknown>;

  const nextMetadata = {
    ...metadata,
  };

  if (Object.keys(restArtifacts).length > 0) {
    nextMetadata.artifacts = restArtifacts;
  } else {
    delete nextMetadata.artifacts;
  }

  return nextMetadata;
}

const result = (await db.execute(sql`
  SELECT id, organization_id, raw_html, source_metadata
  FROM posts
  WHERE content_type = 'image'
    AND html_url IS NULL
    AND (
      raw_html IS NOT NULL
      OR source_metadata #>> '{artifacts,html}' IS NOT NULL
    )
`)) as unknown as { rows: ImagePostRow[] };

let uploaded = 0;
let skipped = 0;

for (const row of result.rows) {
  const html = getLegacyHtml(row);
  if (!html) {
    skipped += 1;
    continue;
  }

  const htmlUrl = await uploadGeneratedHtmlAsset({
    organizationId: row.organization_id,
    html,
    postId: row.id,
  });
  const nextMetadata = buildNextMetadata(row);

  await db.execute(sql`
    UPDATE posts
    SET
      html_url = ${htmlUrl},
      source_metadata = ${JSON.stringify(nextMetadata)}::jsonb
    WHERE id = ${row.id}
  `);

  uploaded += 1;
  console.info("[backfill-image-html-artifacts] uploaded", {
    postId: row.id,
    htmlUrl,
  });
}

console.info("[backfill-image-html-artifacts] complete", {
  uploaded,
  skipped,
});
