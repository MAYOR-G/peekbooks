export type MessageDirection = "user" | "admin";
export type ThreadStatus = "unread" | "open" | "closed";

export interface StoredUpload {
  originalFileName: string;
  storedFileName: string;
  storagePath: string;
  storageProvider: "filesystem" | "blob";
  storageUrl: string | null;
  extension: string;
  mimeType: string;
  sizeBytes: number;
}

export interface MessageReply {
  id: string;
  createdAt: string;
  direction: MessageDirection;
  senderName: string;
  senderEmail: string;
  message: string;
  attachment: StoredUpload | null;
}

export interface MessageThread {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ThreadStatus;
  subject: string;
  senderName: string;
  senderEmail: string;
  preview: string;
  replies: MessageReply[];
}
