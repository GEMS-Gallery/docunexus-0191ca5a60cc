import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import { Document, Note } from '../types';
import NoteList from './NoteList';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleViewNotes = async () => {
    setLoading(true);
    try {
      const fetchedNotes = await backend.getNotes(document.id);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {document.name}
        </Typography>
        <Button onClick={handleViewNotes} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'View Notes'}
        </Button>
        {notes.length > 0 && <NoteList notes={notes} />}
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
