import React from 'react';
import { ContactInfo } from '../../../types';

interface ContactSocialInfoProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

const ContactSocialInfo: React.FC<ContactSocialInfoProps> = ({ contactInfo, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook
          </label>
          <input
            type="url"
            value={contactInfo.social.facebook}
            onChange={(e) => onChange({
              ...contactInfo,
              social: { ...contactInfo.social, facebook: e.target.value }
            })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram
          </label>
          <input
            type="url"
            value={contactInfo.social.instagram}
            onChange={(e) => onChange({
              ...contactInfo,
              social: { ...contactInfo.social, instagram: e.target.value }
            })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Twitter
          </label>
          <input
            type="url"
            value={contactInfo.social.twitter}
            onChange={(e) => onChange({
              ...contactInfo,
              social: { ...contactInfo.social, twitter: e.target.value }
            })}
            className="input"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSocialInfo;