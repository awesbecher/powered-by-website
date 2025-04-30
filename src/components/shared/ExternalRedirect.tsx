import React, { useEffect } from 'react';

interface ExternalRedirectProps {
  to: string;
}

export const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-400">Redirecting to external site...</p>
    </div>
  );
};

export default ExternalRedirect;
