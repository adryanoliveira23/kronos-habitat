'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    // Replace the current locale in the pathname
    // Standard next-intl routing uses /[locale]/...
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPathname = segments.join('/');
    router.push(newPathname || `/${nextLocale}`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white"
    >
      <Globe className="w-3 h-3" />
      {locale === 'pt' ? 'PT' : 'EN'}
    </motion.button>
  );
}
