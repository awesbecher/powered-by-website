import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface ServiceHeaderProps {
  title: string;
  logo?: string;
  onBack: () => void;
}

export function ServiceHeader({ title, logo, onBack }: ServiceHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconButton onClick={onBack} size="large" sx={{ p: 0 }}>
        <ArrowBack />
      </IconButton>
      {logo && (
        <Box
          component="img"
          src={logo}
          alt={`${title} logo`}
          sx={{ height: 40, width: 'auto' }}
        />
      )}
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
    </Box>
  );
}
