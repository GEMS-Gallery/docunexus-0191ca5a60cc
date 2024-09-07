import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Note } from '../types';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <List>
      {notes.map((note) => (
        <ListItem key={note.id}>
          <ListItemText primary={note.content} />
        </ListItem>
      ))}
    </List>
  );
};

export default NoteList;
