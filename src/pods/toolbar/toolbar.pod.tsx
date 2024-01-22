import React from 'react';
import {
  CanvasSettingButton,
  ZoomInButton,
  ZoomOutButton,
  RelationButton,
  EditButton,
  ThemeToggleButton,
  ExportButton,
  NewButton,
  OpenButton,
  SaveButton,
  UndoButton,
  RedoButton,
} from './components';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <NewButton />
      <OpenButton />
      <SaveButton />
      <ZoomInButton />
      <ZoomOutButton />
      <EditButton />
      <RelationButton />
      <UndoButton />
      <RedoButton />
      <ExportButton />
      <CanvasSettingButton />
      <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
    </div>
  );
};
