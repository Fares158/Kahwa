import React, { useState } from 'react';
import { Download } from 'lucide-react';

const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    try {
      // Implement export logic here
      console.log(`Exporting as ${format}...`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="btn-secondary flex items-center gap-2"
        onClick={() => handleExport('pdf')}
        disabled={isExporting}
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  );
};

export default ExportButton;