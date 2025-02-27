import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <main className="pt-16 bg-[#F5F5DC]">
      <section className="py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-12">
            {t('contact.title')}
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {t('contact.getInTouch')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#8B4513]" />
                  <p>{t('contact.address')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#8B4513]" />
                  <p>{t('contact.phone')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#8B4513]" />
                  <p>{t('contact.email')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#8B4513]" />
                  <div>
                    <p>{t('contact.hours.weekdays')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[300px] rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1342.1525247065254!2d10.154571946285444!3d36.86175908405392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd334cd3e3e50b%3A0x4539f241e54328ab!2sThe%20Cast!5e0!3m2!1sfr!2sfr!4v1740666270435!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
