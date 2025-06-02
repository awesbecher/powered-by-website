
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default CustomBadge;
