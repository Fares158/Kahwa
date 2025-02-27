typescript
// Add contact types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
  priority: 'normal' | 'high';
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

// ... rest of existing types
```