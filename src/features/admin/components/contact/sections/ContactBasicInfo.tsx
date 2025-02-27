import React from 'react';
import { ContactInfo } from '../../../types';

interface ContactBasicInfoProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

const ContactBasicInfo: React.FC<ContactBasicInfoProps> = ({ contactInfo, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => onChange({ ...contactInfo, phone: e.target.value })}
            className="input"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactBasicInfo;