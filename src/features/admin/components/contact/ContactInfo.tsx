import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ContactInfo as ContactInfoType } from '../../types';
import Card from '../../../../components/shared/Card';
import ContactBasicInfo from './sections/ContactBasicInfo';
import ContactLocationInfo from './sections/ContactLocationInfo';
import ContactSocialInfo from './sections/ContactSocialInfo';

const ContactInfo: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoType>({
    email: 'info@thecast.com',
    phone: '+216 55 304 314',
    address: {
      street: "Av. de l'Ère Nouvelle",
      city: 'Ariana',
      country: 'Tunisia',
      coordinates: {
        lat: 36.8665,
        lng: 10.1933
      }
    },
    social: {
      facebook: 'https://facebook.com/thecast',
      instagram: 'https://instagram.com/thecast',
      twitter: 'https://twitter.com/thecast'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving contact info:', contactInfo);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactBasicInfo 
            contactInfo={contactInfo} 
            onChange={setContactInfo} 
          />
          <ContactLocationInfo 
            contactInfo={contactInfo} 
            onChange={setContactInfo} 
          />
        </div>
        
        <ContactSocialInfo 
          contactInfo={contactInfo} 
          onChange={setContactInfo} 
        />

        <div className="flex justify-end">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ContactInfo;