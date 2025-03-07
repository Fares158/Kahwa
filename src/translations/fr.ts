import type { Translations } from './types';

export const fr: Translations = {
  nav: {
    home: 'Accueil',
    menu: 'Menu',
    about: 'À Propos',
    gallery: 'Galerie',
    events: 'Évènements',
    reviews: 'Avis',
    contact: 'Contact',
  },
  hero: {
    welcome: 'Bienvenue à The Cast',
    subtitle: 'Où le café rencontre le cinema',
    cta: 'Explorer le Menu',
  },
  features: {
    title: 'Caractéristiques',
    ambiance: 'Ambiance Plateau de Cinéma',
    wifi: 'Wifi gratuit',
    chichas: 'Chichas disponibles',
  },
  menu: {
    title: 'Productions Vedettes',
    search: 'Rechercher dans le menu...',
    filterAll: 'Tout',
    noResults:
      "Aucun élément trouvé. Essayez d'ajuster votre recherche ou vos filtres.",
    categories: {
      coffee: 'Café',
      tea: 'Thé',
      pastries: 'Pâtisseries',
      specialties: 'Spécialités',
    },
    dietary: {
      vegetarian: 'Végétarien',
      vegan: 'Végétalien',
      glutenFree: 'Sans Gluten',
    },
    status: {
      available: 'Disponible',
      unavailable: 'Temporairement indisponible',
      featured: 'Produit Vedette',
    },
    items: {
      coffee: {
        godfather: {
          name: "L'Espresso du Parrain",
          description:
            "Une offre que vous ne pouvez pas refuser - un shot d'essence de café pure, riche et corsée",
          price: '3,50 DT',
        },
        casablanca: {
          name: 'Cappuccino Casablanca',
          description:
            "Je te regarde, petit - l'équilibre parfait entre espresso, lait vapeur et mousse",
          price: '4,50 DT',
        },
        pulpFiction: {
          name: 'Flat White Pulp Fiction',
          description: 'Royale au lait - perfection veloutée du café',
          price: '4,00 DT',
        },
      },
      tea: {
        breakfast: {
          name: 'Diamants sur Canapé',
          description: 'Thé English breakfast classique servi avec élégance',
          price: '3,00 DT',
        },
        greenMile: {
          name: 'La Ligne Verte',
          description:
            'Thé vert japonais premium avec une finale rafraîchissante',
          price: '3,50 DT',
        },
      },
      pastries: {
        croissant: {
          name: 'Croissant Cinema Paradiso',
          description:
            'Couches feuilletées et beurrées fraîchement cuites à la perfection',
          price: '3,50 DT',
        },
        lemonTart: {
          name: 'Tarte au Citron La La Land',
          description: 'Un hommage sucré et acidulé aux rêves hollywoodiens',
          price: '4,50 DT',
        },
      },
    },
  },
  specials: {
    title: 'Nos Spécialités',
    subtitle: 'Créations vedettes de nos maîtres baristas',
    items: {
      signatureLatte: {
        name: 'Latte Signature',
        description:
          'Notre mélange signature avec une touche cinématographique',
        price: '4,50 DT',
      },
      pourOver: {
        name: 'Pour Over Artisanal',
        description: "Café d'origine unique préparé à la perfection",
        price: '5,00 DT',
      },
      mocha: {
        name: 'Mocha Spécial Maison',
        description: "Riche chocolat rencontre l'espresso premium",
        price: '5,50 DT',
      },
    },
  },
  about: {
    title: 'Notre Histoire',
    image: 'Intérieur du café',
    story:
      "Fondé en 2020, The Cast est né avec une mission simple : créer un espace où le café n'est pas seulement servi, mais célébré. Notre aventure a commencé avec une passion pour le café d'exception et le rêve de bâtir une communauté autour.",
    location:
      "Situé au cœur d'Ariana, nous sommes devenus plus qu'un simple café - un lieu de rencontre pour les amateurs de café, les télétravailleurs, et tous ceux qui cherchent un moment de tranquillité dans leur journée chargée.",
    mission:
      "Chaque tasse que nous servons témoigne de notre engagement envers la qualité, la durabilité et l'art de la préparation du café. Nos grains sont éthiquement sourcés, soigneusement torréfiés et préparés par nos baristas qualifiés qui partagent notre passion.",
  },
  gallery: {
    title: 'Galerie',
    noResults: 'Vide',
    ViewFullGallery: 'Voir toute la galerie',
    categories: {
      all: 'Toutes les Photos',
      interior: 'Intérieur',
      drinks: 'Boissons',
      food: 'Nourriture',
      events: 'Événements',
    },
    actions: {
      view: "Voir l'image complète",
      close: 'Fermer la galerie',
      previous: 'Image précédente',
      next: 'Image suivante',
    },
  },
  reviews: {
    title: 'Ce Que Disent Nos Clients',
    writeReview: 'Écrire un Avis',
    sortBy: {
      newest: 'Plus Récents',
      highest: 'Mieux Notés',
      lowest: 'Moins Bien Notés',
    },
    form: {
      rating: 'Votre Note',
      comment: 'Votre Commentaire',
      submit: 'Envoyer',
    },
  },
  events: {
    title: 'Événements à Venir',
    subtitle:
      'Rejoignez-nous pour des projections spéciales et des expériences café',
    upcomingEvents: 'Événements à Venir',
    noupcoming : "Pas d'événements prévus pour le moment",
    pastEvents: 'Événements Passés',
    noEvents: 'Aucun événement trouvé',
    pastEventLabel: 'Événement Passé',
    ViewAllEvents: 'Voir tous les évènements',
    viewsLabel: 'vues',
    form: {
      addEvent: 'Ajouter un Événement',
      editEvent: "Modifier l'Événement",
      title: 'Titre',
      date: 'Date',
      time: 'Heure',
      shortDescription: 'Description Courte',
      fullDescription: 'Description Complète',
      image: "Image de l'Événement",
      cancel: 'Annuler',
      save: 'Enregistrer',
      add: 'Ajouter',
    },
    sort: {
      latestFirst: 'Plus Récents',
      oldestFirst: 'Plus Anciens',
      titleAZ: 'Titre A-Z',
      titleZA: 'Titre Z-A',
    },
    filter: {
      allEvents: 'Tous les Événements',
      upcoming: 'À Venir',
      past: 'Passés',
    },
  },
  contact: {
    title: 'Contactez-nous',
    getInTouch: 'Entrer en Contact',
    address: "Av. de l'Ère Nouvelle, Ariana 2001, Tunisie",
    phone: '+216 55 304 314',
    email: 'info@thecast.com',
    hours: {
      title: "Horaires d'Ouverture",
      weekdays: 'Lun-Dim : 07:00 - 00:00',
    },
    sendMessage: 'Envoyez-nous un Message',
    form: {
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Message',
      namePlaceholder: 'Entrez votre nom',
      emailPlaceholder: 'Entrez votre email',
      subjectPlaceholder: 'Entrez le sujet',
      messagePlaceholder: 'Entrez votre message',
      submit: 'Envoyer',
    },
    success: 'Message envoyé avec succès ! Nous vous répondrons bientôt.',
    error:
      "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
  },
  footer: {
    brand: {
      title: 'The Cast',
      slogan: 'Où le Café Rencontre le Cinéma',
    },
    newsletter: {
      title: 'Abonnez-vous à Notre Newsletter',
      description:
        'Restez informé de nos dernières créations et projections spéciales',
      placeholder: 'Entrez votre email',
      button: "S'abonner",
      success: 'Merci pour votre abonnement !',
      error: 'Une erreur est survenue. Veuillez réessayer.',
    },
    contact: 'Contact',
    quickLinks: 'Liens Rapides',
    followUs: 'Suivez-nous',
    rights: 'Tous droits réservés.',
    social: {
      facebook: 'Suivez-nous sur Facebook',
      instagram: 'Suivez-nous sur Instagram',
      twitter: 'Suivez-nous sur Twitter',
    },
  },
  admin: {
    login: {
      title: 'Portail du Personnel',
      email: 'Email',
      password: 'Mot de passe',
      submit: 'Se Connecter',
      error: 'Identifiants invalides',
    },
    dashboard: {
      title: 'Tableau de Bord',
      welcome: 'Bon Retour',
      stats: {
        orders: 'Commandes Totales',
        users: 'Utilisateurs Actifs',
        reviews: 'Avis',
        revenue: 'Revenu',
      },
    },
    common: {
      save: 'Sauvegarder',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher...',
      loading: 'Chargement...',
      noResults: 'Aucun résultat trouvé',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    },
  },
};
