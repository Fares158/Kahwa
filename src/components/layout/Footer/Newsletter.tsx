import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md"
      aria-label="Newsletter subscription form"
    >
      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('footer.newsletter.placeholder')}
          required
          className="px-4 py-2 rounded-md bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-primary"
          aria-label="Email address for newsletter"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
        >
          {t('footer.newsletter.button')}
        </button>
      </div>
    </form>
  );
};

export default Newsletter;