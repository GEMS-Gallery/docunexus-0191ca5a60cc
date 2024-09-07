import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import { Workspace, Document } from '../types';
import DocumentCard from './DocumentCard';
import DropZone from './DropZone';

interface WorkspaceViewProps {
  workspace: Workspace;
}

const WorkspaceView: React.FC<WorkspaceViewProps> = ({ workspace }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDocuments();
  }, [workspace.id]);

  const fetchDocuments = async () => {
    try {
      const fetchedDocuments = await backend.getDocuments(workspace.id);
      setDocuments(fetchedDocuments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = new Uint8Array(e.target?.result as ArrayBuffer);
        await backend.addDocument(workspace.id, file.name, content);
        fetchDocuments();
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {workspace.name}
      </Typography>
      <DropZone onFileUpload={handleFileUpload} />
      <Grid container spacing={3}>
        {documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <DocumentCard document={document} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkspaceView;
