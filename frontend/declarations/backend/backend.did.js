export const idlFactory = ({ IDL }) => {
  const Document = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'name' : IDL.Text,
    'workspaceId' : IDL.Nat,
  });
  const Note = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'documentId' : IDL.Nat,
  });
  const Workspace = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text });
  return IDL.Service({
    'addDocument' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Nat],
        [],
      ),
    'addNote' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Nat], []),
    'createWorkspace' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'getDocuments' : IDL.Func([IDL.Nat], [IDL.Vec(Document)], ['query']),
    'getNotes' : IDL.Func([IDL.Nat], [IDL.Vec(Note)], ['query']),
    'getWorkspaces' : IDL.Func([], [IDL.Vec(Workspace)], ['query']),
    'updateNote' : IDL.Func([IDL.Nat, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
