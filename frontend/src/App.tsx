import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import WorkspaceView from './components/WorkspaceView';
import { Workspace } from './types';

const App: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const fetchedWorkspaces = await backend.getWorkspaces();
      setWorkspaces(fetchedWorkspaces);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveWorkspace(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeWorkspace} onChange={handleTabChange}>
          {workspaces.map((workspace) => (
            <Tab key={workspace.id} label={workspace.name} />
          ))}
        </Tabs>
      </Box>
      {workspaces[activeWorkspace] && (
        <WorkspaceView workspace={workspaces[activeWorkspace]} />
      )}
    </Box>
  );
};

export default App;
