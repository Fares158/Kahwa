import type { Translations } from './types';

export const en: Translations = {
  nav: {
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    gallery: 'Gallery',
    events: 'Events',
    reviews: 'Reviews',
    contact: 'Contact',
  },
  hero: {
    welcome: 'Welcome to The Cast',
    subtitle: 'Where coffee meets cinema',
    cta: 'Explore Menu',
  },
  features: {
    title: 'Scene Features',
    coffee: 'Cinematic Coffee',
    coffee_desc: 'Signature drinks inspired by classic films',
    ambiance: 'Movie-Set Ambiance',
    chichas: 'Chichas available',
    wifi: 'Free wifi',
  },
  menu: {
    title: 'Featured Productions',
    search: 'Search menu items...',
    filterAll: 'All',
    noResults: 'No menu items found. Try adjusting your search or filters.',
    categories: {
      coffee: 'Coffee',
      tea: 'Tea',
      pastries: 'Pastries',
      specialties: 'Specialties',
    },
    dietary: {
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      glutenFree: 'Gluten Free',
    },
    status: {
      available: 'Available',
      unavailable: 'Currently unavailable',
      featured: 'Featured Item',
    },
    items: {
      coffee: {
        godfather: {
          name: 'The Godfather Espresso',
          description:
            "An offer you can't refuse - rich and bold single shot of pure coffee essence",
          price: '3.50 DT',
        },
        casablanca: {
          name: 'Casablanca Cappuccino',
          description:
            "Here's looking at you, kid - perfect balance of espresso, steamed milk, and foam",
          price: '4.50 DT',
        },
        pulpFiction: {
          name: 'Pulp Fiction Flat White',
          description:
            'Royale with milk - smooth and velvety coffee perfection',
          price: '4.00 DT',
        },
      },
      tea: {
        breakfast: {
          name: "Breakfast at Tiffany's",
          description: 'Classic English breakfast tea served with elegance',
          price: '3.00 DT',
        },
        greenMile: {
          name: 'The Green Mile',
          description: 'Premium Japanese green tea with a refreshing finish',
          price: '3.50 DT',
        },
      },
      pastries: {
        croissant: {
          name: 'Cinema Paradiso Croissant',
          description: 'Flaky, buttery layers of freshly baked perfection',
          price: '3.50 DT',
        },
        lemonTart: {
          name: 'La La Land Lemon Tart',
          description: 'A sweet and tangy tribute to Hollywood dreams',
          price: '4.50 DT',
        },
      },
    },
  },
  specials: {
    title: 'Our Specials',
    subtitle: 'Featured creations from our master baristas',
    items: {
      signatureLatte: {
        name: 'Signature Latte',
        description: 'Our signature blend with a cinematic twist',
        price: '4.50 DT',
      },
      pourOver: {
        name: 'Artisan Pour Over',
        description: 'Single-origin coffee brewed to perfection',
        price: '5.00 DT',
      },
      mocha: {
        name: 'House Special Mocha',
        description: 'Rich chocolate meets premium espresso',
        price: '5.50 DT',
      },
    },
  },
  about: {
    title: 'Our Story',
    image: 'Coffee shop interior',
    story:
      "Founded in 2020, The Cast began with a simple mission: to create a space where coffee isn't just served, but celebrated. Our journey started with a passion for exceptional coffee and a dream to build a community around it.",
    location:
      "Located in the heart of Ariana, we've become more than just a coffee shop - we're a gathering place for coffee enthusiasts, remote workers, and anyone seeking a moment of tranquility in their busy day.",
    mission:
      'Every cup we serve is a testament to our commitment to quality, sustainability, and the art of coffee making. Our beans are ethically sourced, carefully roasted, and prepared by our skilled baristas who share our passion for coffee excellence.',
  },
  gallery: {
    title: 'Gallery',
    noResults: 'Empty',
    ViewFullGallery: 'View full gallery',
    categories: {
      all: 'All Photos',
      interior: 'Interior',
      drinks: 'Drinks',
      food: 'Food',
      events: 'Events',
    },
    actions: {
      view: 'View full image',
      close: 'Close gallery',
      previous: 'Previous image',
      next: 'Next image',
    },
  },
  reviews: {
    title: 'What Our Customers Say',
    writeReview: 'Write a Review',
    sortBy: {
      newest: 'Newest First',
      highest: 'Highest Rated',
      lowest: 'Lowest Rated',
    },
    form: {
      rating: 'Your Rating',
      comment: 'Your Review',
      submit: 'Submit Review',
    },
  },
  events: {
    title: 'Upcoming Events',
    subtitle: 'Join us for special screenings and coffee experiences',
    upcomingEvents: 'Upcoming Events',
    noupcoming : 'No upcoming events for now',
    pastEvents: 'Past Events',
    noEvents: 'No events found',
    pastEventLabel: 'Past Event',
    ViewAllEvents: 'View all events',
    viewsLabel: 'views',
    form: {
      addEvent: 'Add Event',
      editEvent: 'Edit Event',
      title: 'Title',
      date: 'Date',
      time: 'Time',
      shortDescription: 'Short Description',
      fullDescription: 'Full Description',
      image: 'Event Image',
      cancel: 'Cancel',
      save: 'Save Changes',
      add: 'Add Event',
    },
    sort: {
      latestFirst: 'Latest First',
      oldestFirst: 'Oldest First',
      titleAZ: 'Title A-Z',
      titleZA: 'Title Z-A',
    },
    filter: {
      allEvents: 'All Events',
      upcoming: 'Upcoming',
      past: 'Past',
    },
  },
  contact: {
    title: 'Contact Us',
    getInTouch: 'Get in Touch',
    address: "Av. de l'Ère Nouvelle, Ariana 2001, Tunisia",
    phone: '+216 55 304 314',
    email: 'info@thecast.com',
    hours: {
      title: 'Opening Hours',
      weekdays: 'Mon-Fri: 07:00 - 00:00',
    },
    sendMessage: 'Send us a Message',
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Enter your name',
      emailPlaceholder: 'Enter your email',
      subjectPlaceholder: 'Enter subject',
      messagePlaceholder: 'Enter your message',
      submit: 'Send Message',
    },
    success: "Message sent successfully! We'll get back to you soon.",
    error: 'There was an error sending your message. Please try again.',
  },
  footer: {
    brand: {
      title: 'The Cast',
      slogan: 'Where Coffee Meets Cinema',
    },
    newsletter: {
      title: 'Subscribe to Our Newsletter',
      description:
        'Stay updated with our latest releases and special screenings',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      success: 'Thank you for subscribing!',
      error: 'There was an error subscribing. Please try again.',
    },
    contact: 'Contact',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    rights: 'All rights reserved.',
    social: {
      facebook: 'Follow us on Facebook',
      instagram: 'Follow us on Instagram',
      twitter: 'Follow us on Twitter',
    },
  },
  admin: {
    login: {
      title: 'Staff Portal',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      error: 'Invalid credentials',
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome Back',
      stats: {
        orders: 'Total Orders',
        users: 'Active Users',
        reviews: 'Reviews',
        revenue: 'Revenue',
      },
      activity: {
        title: 'Recent Activity',
        empty: 'No recent activity',
      },
      quickActions: {
        title: 'Quick Actions',
        empty: 'No actions available',
      },
    },
    menu: {
      title: 'Menu Management',
      addItem: 'Add Item',
      editItem: 'Edit Item',
      categories: {
        coffee: 'Coffee',
        tea: 'Tea',
        pastries: 'Pastries',
        specialties: 'Specialties',
      },
      form: {
        name: 'Name',
        price: 'Price',
        description: 'Description',
        category: 'Category',
        image: 'Image URL',
        available: 'Available',
        featured: 'Featured',
      },
    },
    gallery: {
      title: 'Gallery Management',
      addImage: 'Add Image',
      editImage: 'Edit Image',
      form: {
        url: 'Image URL',
        alt: 'Alt Text',
        caption: 'Caption',
        category: 'Category',
      },
    },
    reviews: {
      title: 'Reviews Management',
      filters: {
        status: 'Status',
        rating: 'Rating',
        featured: 'Featured',
      },
      actions: {
        approve: 'Approve',
        reject: 'Reject',
        feature: 'Feature',
        delete: 'Delete',
      },
    },
    contact: {
      title: 'Contact Management',
      messages: 'Messages',
      info: 'Contact Info',
      reply: 'Reply to Message',
      status: {
        new: 'New',
        replied: 'Replied',
        archived: 'Archived',
      },
    },
    settings: {
      title: 'Settings',
      sections: {
        general: 'General',
        theme: 'Theme',
        security: 'Security',
        backup: 'Backup & Restore',
      },
      form: {
        siteName: 'Site Name',
        logo: 'Logo URL',
        defaultLanguage: 'Default Language',
        colors: {
          primary: 'Primary Color',
          secondary: 'Secondary Color',
          accent: 'Accent Color',
        },
        security: {
          twoFactor: 'Two-Factor Authentication',
          sessionTimeout: 'Session Timeout',
          passwordLength: 'Minimum Password Length',
        },
      },
      common: {
        save: 'Save Changes',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add New',
        search: 'Search...',
        loading: 'Loading...',
        noResults: 'No results found',
        confirmDelete: 'Are you sure you want to delete this item?',
      },
    },
  },
};
