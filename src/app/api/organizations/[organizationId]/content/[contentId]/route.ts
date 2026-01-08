import { type NextRequest, NextResponse } from "next/server";
import { EXAMPLE_CONTENT } from "@/app/(dashboard)/[slug]/content/[id]/content-data";
import { withOrganizationAuth } from "@/lib/auth/organization";

const TITLE_REGEX = /^#\s+(.+)$/m;

interface RouteContext {
  params: Promise<{ organizationId: string; contentId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { organizationId, contentId } = await params;
    const auth = await withOrganizationAuth(request, organizationId);

    if (!auth.success) {
      return auth.response;
    }

    const content = EXAMPLE_CONTENT.find((c) => c.id === contentId);

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({
      content: {
        ...content,
        date: content.date.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { organizationId, contentId } = await params;
    const auth = await withOrganizationAuth(request, organizationId);

    if (!auth.success) {
      return auth.response;
    }

    const body = await request.json();
    const { markdown } = body;

    if (typeof markdown !== "string") {
      return NextResponse.json(
        { error: "markdown field is required" },
        { status: 400 }
      );
    }

    const contentIndex = EXAMPLE_CONTENT.findIndex((c) => c.id === contentId);

    if (contentIndex === -1) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Update the content in memory
    EXAMPLE_CONTENT[contentIndex].markdown = markdown;

    // Extract title from markdown
    const titleMatch = markdown.match(TITLE_REGEX);
    if (titleMatch) {
      EXAMPLE_CONTENT[contentIndex].title = titleMatch[1];
    }

    return NextResponse.json({
      success: true,
      content: {
        ...EXAMPLE_CONTENT[contentIndex],
        date: EXAMPLE_CONTENT[contentIndex].date.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
