import React, { useState } from 'react';
import { Download, FileSpreadsheet, Database } from 'lucide-react';
import { supabase } from '../../../../../lib/supabase/client';
import { toast } from 'react-hot-toast';

const DataExportSection = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'csv' | 'json'>('csv');

  const handleExport = async (table: string) => {
    setIsExporting(true);
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*');
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        toast.error(`No data found in ${table}`);
        return;
      }
      
      let content: string;
      let filename: string;
      let type: string;
      
      if (exportType === 'csv') {
        // Convert to CSV
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => 
          Object.values(row).map(value => 
            typeof value === 'object' ? JSON.stringify(value) : value
          ).join(',')
        ).join('\n');
        content = `${headers}\n${rows}`;
        filename = `${table}_export_${new Date().toISOString().split('T')[0]}.csv`;
        type = 'text/csv';
      } else {
        // JSON format
        content = JSON.stringify(data, null, 2);
        filename = `${table}_export_${new Date().toISOString().split('T')[0]}.json`;
        type = 'application/json';
      }
      
      // Create download link
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`${table} data exported successfully`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export ${table} data`);
    } finally {
      setIsExporting(false);
    }
  };

  const tables = [
    { name: 'menu_items', label: 'Menu Items', icon: FileSpreadsheet },
    { name: 'menu_categories', label: 'Menu Categories', icon: FileSpreadsheet },
    { name: 'events', label: 'Events', icon: FileSpreadsheet },
    { name: 'media', label: 'Gallery Media', icon: FileSpreadsheet },
    { name: 'folders', label: 'Gallery Folders', icon: FileSpreadsheet },
    { name: 'site_metrics', label: 'Analytics Data', icon: Database }
  ];

  return (
    <div className="space-y-6 bg-white rounded-lg p-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Export Data</h3>
        <p className="text-sm text-gray-600 mb-4">
          Export your site data for backup or analysis purposes
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Format
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={exportType === 'csv'}
                onChange={() => setExportType('csv')}
                name="exportType"
              />
              <span>CSV</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={exportType === 'json'}
                onChange={() => setExportType('json')}
                name="exportType"
              />
              <span>JSON</span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tables.map((table) => (
            <div key={table.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <table.icon className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{table.label}</span>
                </div>
                <button
                  onClick={() => handleExport(table.name)}
                  className="btn-secondary flex items-center gap-2 py-2 px-3 text-sm"
                  disabled={isExporting}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataExportSection;