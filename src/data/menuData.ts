import { MenuItem } from '../types/menu';

export const menuData: Record<string, MenuItem[]> = {
  Coffee: [
    {
      id: 'coffee-1',
      name: 'The Godfather Espresso',
      description: 'An offer you can\'t refuse - rich and bold single shot of pure coffee essence',
      price: '3.50DT',
      image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80',
      category: 'Coffee',
      available: true,
      featured: true
    },
    {
      id: 'coffee-2',
      name: 'Casablanca Cappuccino',
      description: 'Here\'s looking at you, kid - perfect balance of espresso, steamed milk, and foam',
      price: '4.50DT',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80',
      category: 'Coffee',
      available: true,
      dietary: {
        vegetarian: true,
        vegan: true
      }
    },
    // ... other coffee items
  ],
  Tea: [
    {
      id: 'tea-1',
      name: 'Breakfast at Tiffany\'s',
      description: 'Classic English breakfast tea served with elegance',
      price: '3.00DT',
      image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80',
      category: 'Tea',
      available: true,
      dietary: {
        vegetarian: true,
        vegan: true,
        glutenFree: true
      }
    },
    // ... other tea items
  ],
  Pastries: [
    {
      id: 'pastry-1',
      name: 'Cinema Paradiso Croissant',
      description: 'Flaky, buttery layers of freshly baked perfection',
      price: '3.50DT',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80',
      category: 'Pastries',
      available: true,
      dietary: {
        vegetarian: true
      }
    },
    // ... other pastry items
  ]
};