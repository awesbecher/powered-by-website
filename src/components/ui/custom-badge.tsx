import React from 'react';
import { cn } from '@/lib/utils';

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ 
  className, 
  children,
  active = false,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
        active ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CustomBadge;
