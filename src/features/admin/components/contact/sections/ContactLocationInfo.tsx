import React from 'react';
import { ContactInfo } from '../../../types';

interface ContactLocationInfoProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

const ContactLocationInfo: React.FC<ContactLocationInfoProps> = ({ contactInfo, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Location</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            value={contactInfo.address.street}
            onChange={(e) => onChange({
              ...contactInfo,
              address: { ...contactInfo.address, street: e.target.value }
            })}
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={contactInfo.address.city}
              onChange={(e) => onChange({
                ...contactInfo,
                address: { ...contactInfo.address, city: e.target.value }
              })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={contactInfo.address.country}
              onChange={(e) => onChange({
                ...contactInfo,
                address: { ...contactInfo.address, country: e.target.value }
              })}
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={contactInfo.address.coordinates.lat}
              onChange={(e) => onChange({
                ...contactInfo,
                address: {
                  ...contactInfo.address,
                  coordinates: {
                    ...contactInfo.address.coordinates,
                    lat: parseFloat(e.target.value)
                  }
                }
              })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={contactInfo.address.coordinates.lng}
              onChange={(e) => onChange({
                ...contactInfo,
                address: {
                  ...contactInfo.address,
                  coordinates: {
                    ...contactInfo.address.coordinates,
                    lng: parseFloat(e.target.value)
                  }
                }
              })}
              className="input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLocationInfo;