import React from 'react';

import { Stack, useTheme } from '@mui/material';

import { useInspectorDrawerOpen, useSamplesDrawerOpen } from './documents/editor/EditorContext';

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

export default function EmailBuilder() {
  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const samplesDrawerOpen = useSamplesDrawerOpen();

  const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
  const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

  return (
    <>
      <InspectorDrawer />
      <SamplesDrawer />
  
      <Stack
        sx={{
          height: '100vh', // Full height of the viewport
          width: '100vw',  // Full width of the viewport
          marginLeft: '-319px',
          marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
          transition: marginRightTransition, // Only transition for margin-right
          overflow: 'hidden', // Prevent scrollbars if content overflows
          backgroundColor: 'white', // Set background color to white
        }}
      >
        <TemplatePanel />
      </Stack>
    </>
  );
}