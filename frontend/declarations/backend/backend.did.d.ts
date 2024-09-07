import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Document {
  'id' : bigint,
  'content' : [] | [Uint8Array | number[]],
  'name' : string,
  'workspaceId' : bigint,
}
export interface Note {
  'id' : bigint,
  'content' : string,
  'documentId' : bigint,
}
export interface Workspace { 'id' : bigint, 'name' : string }
export interface _SERVICE {
  'addDocument' : ActorMethod<[bigint, string, Uint8Array | number[]], bigint>,
  'addNote' : ActorMethod<[bigint, string], bigint>,
  'createWorkspace' : ActorMethod<[string], bigint>,
  'getDocuments' : ActorMethod<[bigint], Array<Document>>,
  'getNotes' : ActorMethod<[bigint], Array<Note>>,
  'getWorkspaces' : ActorMethod<[], Array<Workspace>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
