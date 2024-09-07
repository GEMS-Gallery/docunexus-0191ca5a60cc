import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

actor {
  type Workspace = {
    id: Nat;
    name: Text;
  };

  type Document = {
    id: Nat;
    workspaceId: Nat;
    name: Text;
    content: ?Blob;
  };

  type Note = {
    id: Nat;
    documentId: Nat;
    content: Text;
  };

  stable var nextWorkspaceId: Nat = 0;
  stable var nextDocumentId: Nat = 0;
  stable var nextNoteId: Nat = 0;

  let workspaces = HashMap.HashMap<Nat, Workspace>(10, Nat.equal, Hash.hash);
  let documents = HashMap.HashMap<Nat, Document>(50, Nat.equal, Hash.hash);
  let notes = HashMap.HashMap<Nat, Note>(100, Nat.equal, Hash.hash);

  public func createWorkspace(name: Text) : async Nat {
    let id = nextWorkspaceId;
    nextWorkspaceId += 1;
    let workspace: Workspace = { id; name };
    workspaces.put(id, workspace);
    id
  };

  public query func getWorkspaces() : async [Workspace] {
    Buffer.toArray(Buffer.fromIter<Workspace>(workspaces.vals()))
  };

  public func addDocument(workspaceId: Nat, name: Text, content: Blob) : async Nat {
    let id = nextDocumentId;
    nextDocumentId += 1;
    let document: Document = { id; workspaceId; name; content = ?content };
    documents.put(id, document);
    id
  };

  public query func getDocuments(workspaceId: Nat) : async [Document] {
    let docs = Buffer.Buffer<Document>(0);
    for (doc in documents.vals()) {
      if (doc.workspaceId == workspaceId) {
        docs.add(doc);
      };
    };
    Buffer.toArray(docs)
  };

  public func addNote(documentId: Nat, content: Text) : async Nat {
    let id = nextNoteId;
    nextNoteId += 1;
    let note: Note = { id; documentId; content };
    notes.put(id, note);
    id
  };

  public query func getNotes(documentId: Nat) : async [Note] {
    let docNotes = Buffer.Buffer<Note>(0);
    for (note in notes.vals()) {
      if (note.documentId == documentId) {
        docNotes.add(note);
      };
    };
    Buffer.toArray(docNotes)
  };

  public func updateNote(id: Nat, content: Text) : async () {
    switch (notes.get(id)) {
      case (null) {
        // Note not found, handle error
      };
      case (?note) {
        let updatedNote: Note = {
          id = note.id;
          documentId = note.documentId;
          content = content;
        };
        notes.put(id, updatedNote);
      };
    };
  };

  system func preupgrade() {
    // Implement if needed
  };

  system func postupgrade() {
    // Implement if needed
  };
}
