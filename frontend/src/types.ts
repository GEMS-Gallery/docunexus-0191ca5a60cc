export interface Workspace {
  id: number;
  name: string;
}

export interface Document {
  id: number;
  workspaceId: number;
  name: string;
  content: Uint8Array | null;
}

export interface Note {
  id: number;
  documentId: number;
  content: string;
}
