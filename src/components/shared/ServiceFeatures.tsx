import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';

interface ServiceFeaturesProps {
  features: readonly string[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <List>
      {features.map((feature) => (
        <ListItem key={feature}>
          <ListItemIcon>
            <Check color="primary" />
          </ListItemIcon>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </List>
  );
}
