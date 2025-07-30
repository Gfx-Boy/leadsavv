import React from 'react';

import { Box, Drawer, Tab, Tabs, useTheme } from '@mui/material';

import { setSidebarTab, useInspectorDrawerOpen, useSelectedSidebarTab } from '../documents/editor/EditorContext.tsx';

import ConfigurationPanel from './ConfigurationPanel';
import StylesPanel from './StylesPanel';

export const INSPECTOR_DRAWER_WIDTH = 320;

export default function InspectorDrawer() {
  const theme = useTheme(); // Access the theme
  const selectedSidebarTab = useSelectedSidebarTab();
  const inspectorDrawerOpen = useInspectorDrawerOpen();

  const renderCurrentSidebarPanel = () => {
    switch (selectedSidebarTab) {
      case 'block-configuration':
        return <ConfigurationPanel />;
      case 'styles':
        return <StylesPanel />;
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={inspectorDrawerOpen}
      sx={{
        width: inspectorDrawerOpen ? INSPECTOR_DRAWER_WIDTH : 0,
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.background.paper, // Use theme's paper background color
          color: theme.palette.text.primary, // Use theme's primary text color
        },
      }}
    >
      <Box
        sx={{
          width: INSPECTOR_DRAWER_WIDTH,
          height: 49,
          borderBottom: 1,
          borderColor: theme.palette.divider, // Use theme's divider color
          backgroundColor: theme.palette.background.default, // Use theme's default background color
        }}
      >
        <Box px={2}>
          <Tabs
            value={selectedSidebarTab}
            onChange={(_, v) => setSidebarTab(v)}
            textColor="inherit" // Ensure text color adapts to the theme
            TabIndicatorProps={{
              style: { backgroundColor: theme.palette.primary.main }, // Use theme's primary color for the indicator
            }}
          >
            <Tab value="styles" label="Styles" />
            <Tab value="block-configuration" label="Inspect" />
          </Tabs>
        </Box>
      </Box>
      <Box
        sx={{
          width: INSPECTOR_DRAWER_WIDTH,
          height: 'calc(100% - 49px)',
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper, // Use theme's paper background color
          color: theme.palette.text.primary, // Use theme's primary text color
        }}
      >
        {renderCurrentSidebarPanel()}
      </Box>
    </Drawer>
  );
}