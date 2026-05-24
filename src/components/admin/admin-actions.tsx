"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProjectStatus } from "@/lib/submission-types";

export function ReplyBox({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch(`/api/admin/messages/${threadId}/reply`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setMessage("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <textarea
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Reply to the client..."
        rows={4}
        className="w-full rounded-2xl border border-input bg-white px-3.5 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20"
      />
      <input name="file" type="file" accept=".doc,.docx,.pdf,.txt,.rtf" className="text-xs" />
      <Button disabled={loading || message.trim().length < 2} size="sm">
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send reply
      </Button>
    </form>
  );
}

export function ProjectStatusSelect({
  submissionId,
  value,
}: {
  submissionId: string;
  value: ProjectStatus;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function update(projectStatus: ProjectStatus) {
    setSaving(true);
    await fetch(`/api/admin/submissions/${submissionId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectStatus }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={value}
        onChange={(event) => update(event.target.value as ProjectStatus)}
        className="h-9 rounded-xl border border-border bg-white px-3 text-sm"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="completed">Completed</option>
      </select>
      {saving ? <LoaderCircle className="h-4 w-4 animate-spin text-primary" /> : null}
    </div>
  );
}
