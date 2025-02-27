import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../shared/Tabs';
import SecuritySettings from './sections/SecuritySettings';
import DataExportSection from './sections/DataExportSection';

const SettingsEditor = () => {
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data Export</TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="data">
          <DataExportSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsEditor;