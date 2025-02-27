import React from 'react';
import { Download, Upload, Save } from 'lucide-react';

const BackupSettings = () => {
  const handleExport = () => {
    console.log('Exporting site data...');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Importing site data from:', file.name);
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-lg p-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Export Data</h3>
        <p className="text-sm text-gray-600 mb-4">
          Download a backup of all your site content and settings
        </p>
        <button
          onClick={handleExport}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Site Data
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-2">Import Data</h3>
        <p className="text-sm text-gray-600 mb-4">
          Restore your site from a previous backup
        </p>
        <label className="btn-secondary flex items-center gap-2 cursor-pointer">
          <Upload className="w-4 h-4" />
          Import Site Data
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default BackupSettings;