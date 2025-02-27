import { en } from './en';
import { fr } from './fr';
import type { Translations } from './types';

export const translations: Record<Language, Translations> = {
  en,
  fr
};

export type Language = 'en' | 'fr';