import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readSubmission, saveSubmission } from "@/lib/submission-store";
import type { ProjectStatus } from "@/lib/submission-types";
import { PublicError, jsonError } from "@/lib/security";

const PROJECT_STATUSES: ProjectStatus[] = ["pending", "in_progress", "completed"];

export async function POST(
  request: Request,
  context: { params: Promise<{ submissionId: string }> },
) {
  try {
    if (!(await isAdminAuthenticated())) {
      throw new PublicError("Unauthorized.", 401);
    }

    const { submissionId } = await context.params;
    const { projectStatus } = (await request.json()) as { projectStatus?: ProjectStatus };

    if (!projectStatus || !PROJECT_STATUSES.includes(projectStatus)) {
      throw new PublicError("Invalid project status.");
    }

    const record = await readSubmission(submissionId);
    record.projectStatus = projectStatus;
    record.updatedAt = new Date().toISOString();
    await saveSubmission(record);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return jsonError(error, "Unable to update status.");
  }
}
