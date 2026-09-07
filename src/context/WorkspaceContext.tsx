'use client';

import React, { createContext, useContext, useState } from 'react';
import { Workspace } from '@/types';
import { mockCurrentWorkspace } from '@/mocks';

interface WorkspaceContextType {
  workspace: Workspace;
  availableWorkspaces: Workspace[];
  switchWorkspace: (workspaceId: string) => void;
}

const mockWorkspaces: Workspace[] = [
  mockCurrentWorkspace,
  {
    id: 'WS-101',
    name: 'Acme Enterprise Global',
    plan: 'Enterprise',
    seatsUsed: 42,
    totalSeats: 100,
  },
  {
    id: 'WS-102',
    name: 'Starlight E-commerce Dev',
    plan: 'Starter',
    seatsUsed: 3,
    totalSeats: 5,
  },
];

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspace, setWorkspace] = useState<Workspace>(mockCurrentWorkspace);

  const switchWorkspace = (workspaceId: string) => {
    const found = mockWorkspaces.find((w) => w.id === workspaceId);
    if (found) {
      setWorkspace(found);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        availableWorkspaces: mockWorkspaces,
        switchWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
