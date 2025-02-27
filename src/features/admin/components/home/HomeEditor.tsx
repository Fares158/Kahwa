import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shared/Tabs';
import HeroEditor from './sections/HeroEditor';
import FeaturesEditor from './sections/FeaturesEditor';
import AboutEditor from './sections/AboutEditor';
import SpecialsEditor from './sections/SpecialsEditor';

const HomeEditor = () => {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Homepage Management</h2>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex gap-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="specials">Specials</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="hero">
          <HeroEditor />
        </TabsContent>
        <TabsContent value="features">
          <FeaturesEditor />
        </TabsContent>
        <TabsContent value="about">
          <AboutEditor />
        </TabsContent>
        <TabsContent value="specials">
          <SpecialsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeEditor;