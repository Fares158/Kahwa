export interface Translations {
  nav: {
    home: string;
    menu: string;
    about: string;
    gallery: string;
    events: string;
    reviews: string;
    contact: string;
  };
  hero: {
    welcome: string;
    subtitle: string;
    cta: string;
  };
  features: {
    title: string;
    coffee: string;
    coffee_desc: string;
    ambiance: string;
    ambiance_desc: string;
    wifi: string;
    wifi_desc: string;
  };
  menu: {
    title: string;
    search: string;
    filterAll: string;
    noResults: string;
    categories: {
      coffee: string;
      tea: string;
      pastries: string;
      specialties: string;
    };
    dietary: {
      vegetarian: string;
      vegan: string;
      glutenFree: string;
    };
    status: {
      available: string;
      unavailable: string;
      featured: string;
    };
    items: Record<string, Record<string, {
      name: string;
      description: string;
      price: string;
    }>>;
  };
  specials: {
    title: string;
    subtitle: string;
    items: Record<string, {
      name: string;
      description: string;
      price: string;
    }>;
  };
  about: {
    title: string;
    image: string;
    story: string;
    location: string;
    mission: string;
  };
  gallery: {
    title: string;
    categories: {
      all: string;
      interior: string;
      drinks: string;
      food: string;
      events: string;
    };
    actions: {
      view: string;
      close: string;
      previous: string;
      next: string;
    };
  };
  events: {
    title: string;
    subtitle: string;
    upcomingEvents: string;
    pastEvents: string;
    noEvents: string;
    pastEventLabel: string;
    viewsLabel: string;
    form: {
      addEvent: string;
      editEvent: string;
      title: string;
      date: string;
      time: string;
      shortDescription: string;
      fullDescription: string;
      image: string;
      cancel: string;
      save: string;
      add: string;
    };
    sort: {
      latestFirst: string;
      oldestFirst: string;
      titleAZ: string;
      titleZA: string;
    };
    filter: {
      allEvents: string;
      upcoming: string;
      past: string;
    };
  };
  reviews: {
    title: string;
    writeReview: string;
    sortBy: {
      newest: string;
      highest: string;
      lowest: string;
    };
    form: {
      rating: string;
      comment: string;
      submit: string;
    };
  };
  contact: {
    title: string;
    getInTouch: string;
    address: string;
    phone: string;
    email: string;
    hours: {
      title: string;
      weekdays: string;
      weekends: string;
    };
    sendMessage: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
    };
    success: string;
    error: string;
  };
  footer: {
    brand: {
      title: string;
      slogan: string;
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
      success: string;
      error: string;
    };
    quickLinks: string;
    followUs: string;
    rights: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  admin: {
    login: {
      title: string;
      email: string;
      password: string;
      submit: string;
      error: string;
    };
    dashboard: {
      title: string;
      welcome: string;
      stats: {
        orders: string;
        users: string;
        reviews: string;
        revenue: string;
      };
    };
    common: {
      save: string;
      cancel: string;
      delete: string;
      edit: string;
      add: string;
      search: string;
      loading: string;
      noResults: string;
      confirmDelete: string;
    };
  };
}