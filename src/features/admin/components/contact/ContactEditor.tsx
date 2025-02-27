import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../shared/Tabs';
import ContactInfo from './ContactInfo';
import ContactMessages from './ContactMessages';
import PageHeader from '../../../../components/shared/PageHeader';

const ContactEditor = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Contact Management" />

      <Tabs defaultValue="messages">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="info">Contact Info</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <ContactMessages />
        </TabsContent>

        <TabsContent value="info">
          <ContactInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactEditor;