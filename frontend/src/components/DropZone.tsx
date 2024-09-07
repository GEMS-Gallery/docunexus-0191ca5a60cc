import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

interface DropZoneProps {
  onFileUpload: (file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onFileUpload(e.dataTransfer.files[0]);
      }
    },
    [onFileUpload]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onFileUpload(e.target.files[0]);
      }
    },
    [onFileUpload]
  );

  return (
    <Box
      sx={{
        border: '2px dashed #cccccc',
        borderRadius: 2,
        p: 2,
        mb: 2,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#e3f2fd' : 'transparent',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input
        type="file"
        onChange={onFileInputChange}
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Typography>
          {isDragActive
            ? 'Drop the file here ...'
            : 'Drag & drop a file here, or click to select a file'}
        </Typography>
      </label>
    </Box>
  );
};

export default DropZone;
