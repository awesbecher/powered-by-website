import React from 'react';
import { Typography } from '@mui/material';

interface ServiceDescriptionProps {
  description: string;
}

export function ServiceDescription({ description }: ServiceDescriptionProps) {
  return (
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  );
}
