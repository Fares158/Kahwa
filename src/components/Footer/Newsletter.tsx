import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h3 className="text-lg font-semibold text-white mb-2">
        {t('footer.newsletter.title')}
      </h3>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('footer.newsletter.placeholder')}
          required
          className="flex-1 px-4 py-2 rounded-md bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-[#8B4513] rounded-md hover:bg-white/90 transition-colors duration-200"
        >
          {t('footer.newsletter.button')}
        </button>
      </div>
    </form>
  );
};

export default Newsletter;