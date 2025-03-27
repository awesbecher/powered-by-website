
import React, { useEffect } from 'react';

const PRNewswireWidget = () => {
  useEffect(() => {
    // Create and append the script element
    const script = document.createElement('script');
    script.id = 'prn_wjs';
    script.src = '//membershipwidgets.vporoom.com/PoweredbyAgency/js/wd_widgets.js';
    script.async = true;
    
    // Append the script to the document
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      const existingScript = document.getElementById('prn_wjs');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="my-8">
      <div 
        className="wd_widget" 
        data-wd_widget-id="cK48JJ6KYb4H" 
        data-wd_widget-host="//membershipwidgets.vporoom.com/PoweredbyAgency"
      >
        Loading data...
      </div>
    </div>
  );
};

export default PRNewswireWidget;
