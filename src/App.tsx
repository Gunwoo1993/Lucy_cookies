/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Star, 
  Heart,
  Menu,
  X,
  Globe
} from 'lucide-react';

// Translations
const translations = {
  id: {
    nav: { home: 'Beranda', story: 'Cerita Kami', menu: 'Menu', contact: 'Kontak', order: 'Pesan Sekarang' },
    hero: {
      subtitle: 'Kelezatan Premium Indonesia',
      title1: 'Seni',
      title2: 'Nastar',
      description: 'Rasakan kue emas legendaris Indonesia. Dibuat dengan tangan menggunakan mentega premium dan selai nanas segar.',
      shopNow: 'Belanja Sekarang',
      ourStory: 'Cerita Kami'
    },
    products: {
      title: 'Menu yang Legendaris',
      description: 'Setiap kue dibuat dengan tangan oleh Lucy menggunakan resep rahasia keluarga yang diturunkan dari generasi ke generasi. Kami hanya menggunakan bahan-bahan Indonesia terbaik untuk memastikan cita rasa ikonik.',
      nastar: {
        name: 'Nastar Nanas Klasik',
        desc: 'Kue kering istimewa kami yang lumer di mulut dengan isian selai nanas buatan sendiri.',
        price: '80.000 - 120.000 IDR'
      },
      kastengel: {
        name: 'Kastengel Premium',
        desc: 'Keju stick gurih dan renyah dibuat dengan keju Edam dan Cheddar pilihan.',
        price: '90.000 IDR'
      },
      putrisalju: {
        name: 'Putri Salju',
        desc: 'Kue kering lembut berbentuk bulan sabit dengan taburan gula halus yang meleleh di mulut.',
        price: '80.000 - 110.000 IDR'
      },
      orderWA: 'Pesan di WhatsApp'
    },
    story: {
      badge: 'Warisan Kami',
      title: 'Dari Dapur Lucy ke Rumah Anda',
      description: 'Yang dimulai sebagai proyek dapur kecil untuk acara keluarga di Jakarta telah berkembang menjadi tradisi yang dicintai. Semangat Lucy untuk Nastar yang sempurna—keseimbangan yang tepat antara kulit mentega dan nanas asam manis—adalah yang mendorong kami setiap hari.',
      stat1: '100%',
      stat1Label: 'Bahan Alami',
      stat2: '30+',
      stat2Label: 'Tahun Tradisi'
    },
    quote: '"Nastar terbaik yang pernah saya makan di luar dapur nenek saya sendiri. Teksturnya benar-benar sempurna."',
    quoteAuthor: '— Maria S., Jakarta',
    contact: {
      title: 'Mari Terhubung',
      kitchen: 'Dapur Kami',
      address: 'Jatirasa, Jatiasih, Bekasi, West Java 17424',
      phone: 'Pesan via WhatsApp',
      phoneNumber: '+62 896-7663-4475'
    },
    footer: '© 2026 LUCY COOKIES. Hak Cipta Dilindungi.'
  },
  en: {
    nav: { home: 'Home', story: 'Our Story', menu: 'Menu', contact: 'Contact', order: 'Order Now' },
    hero: {
      subtitle: 'Premium Indonesian Delicacy',
      title1: 'The Art of',
      title2: 'Nastar',
      description: 'Experience the legendary golden cookies of Indonesia. Handcrafted with premium butter and fresh pineapple jam.',
      shopNow: 'Shop Now',
      ourStory: 'Our Story'
    },
    products: {
      title: 'The Golden Collection',
      description: 'Every single cookie is handcrafted by Lucy using a secret family recipe passed down through generations. We use only the finest Indonesian ingredients to ensure that iconic taste.',
      nastar: {
        name: 'Classic Pineapple Nastar',
        desc: 'Our signature melt-in-your-mouth pastry filled with homemade pineapple jam.',
        price: '80,000 - 120,000 IDR'
      },
      kastengel: {
        name: 'Premium Kastengel',
        desc: 'Savory and crunchy cheese sticks made with aged Dutch Edam and Cheddar.',
        price: '90,000 IDR'
      },
      putrisalju: {
        name: 'Putri Salju',
        desc: 'Delicate crescent-shaped butter cookies coated in fine powdered sugar that melts in your mouth.',
        price: '80,000 - 110,000 IDR'
      },
      orderWA: 'Order in WhatsApp'
    },
    story: {
      badge: 'Our Heritage',
      title: 'From Lucy\'s Kitchen to Your Home',
      description: 'What started as a small kitchen project for family gatherings in Jakarta has blossomed into a beloved tradition. Lucy\'s passion for the perfect Nastar—the right balance of buttery crust and tangy pineapple—is what drives us every day.',
      stat1: '100%',
      stat1Label: 'Natural Ingredients',
      stat2: '30+',
      stat2Label: 'Years of Tradition'
    },
    quote: '"The best Nastar I\'ve ever had outside of my own grandmother\'s kitchen. The texture is simply divine."',
    quoteAuthor: '— Maria S., Jakarta',
    contact: {
      title: 'Let\'s Connect',
      kitchen: 'Our Kitchen',
      address: 'Jatirasa, Jatiasih, Bekasi, West Java 17424',
      phone: 'Order via WhatsApp',
      phoneNumber: '+62 896-7663-4475'
    },
    footer: '© 2026 LUCY COOKIES. All Rights Reserved.'
  }
};

type Language = 'id' | 'en';

// --- Types ---
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (lang: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.story, href: '#our-story' },
    { label: t.nav.menu, href: '#nastar' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-cream/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-widest text-brand-brown"
        >
          LUCY COOKIES
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ y: -2 }}
              className="text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
          >
            <Globe size={16} />
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <motion.a
            href="https://wa.me/6289676634475"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-brown text-brand-cream px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2"
          >
            <ShoppingBag size={14} />
            {t.nav.order}
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-brown" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-t border-brand-brown/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setLang(lang === 'id' ? 'en' : 'id');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-lg font-serif"
              >
                <Globe size={20} />
                {lang === 'id' ? 'English' : 'Indonesia'}
              </button>
              <a
                href="https://wa.me/6289676634475"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-brown text-brand-cream px-6 py-3 rounded-xl text-center font-bold"
              >
                {t.nav.order}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingCookie = () => {
  return (
    <motion.div
      animate={{
        y: [0, -40, 0],
      }}
      transition={{
        y: { 
          duration: 2, 
          repeat: Infinity, 
          ease: [0.4, 0, 0.6, 1]
        },
      }}
      className="relative w-64 h-64 md:w-[500px] md:h-[500px]"
    >
      <div className="absolute inset-0 rounded-full bg-brand-gold/30 blur-3xl animate-pulse" />
      
      <motion.div 
        className="w-full h-full flex items-center justify-center"
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        <img 
          src="/cookies-bowl.png" 
          alt="Lucy's Nastar Bowl"
          className="w-full h-full object-contain drop-shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]"
          onError={(e) => {
            // Fallback to placeholder if image not found
            e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800";
          }}
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 right-4 md:top-10 md:right-10 bg-brand-cream p-2 md:p-4 rounded-full shadow-lg border border-brand-gold/20 z-20"
      >
        <Star className="text-brand-gold fill-brand-gold" size={16} />
      </motion.div>
      <div className="hidden md:block absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40 z-20">
        <p className="text-xs font-bold uppercase tracking-tighter text-brand-brown/60">Handmade with Love</p>
        <p className="text-2xl font-serif italic text-brand-gold">Premium Nastar Bowl</p>
      </div>
    </motion.div>
  );
};

const ProductSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const products = [
    {
      name: t.products.nastar.name,
      desc: t.products.nastar.desc,
      price: t.products.nastar.price,
      image: "/nastar2.jpg"
    },
    {
      name: t.products.kastengel.name,
      desc: t.products.kastengel.desc,
      price: t.products.kastengel.price,
      image: "/kastengel.jpg"
    },
    {
      name: t.products.putrisalju.name,
      desc: t.products.putrisalju.desc,
      price: t.products.putrisalju.price,
      image: "/putrisalju.jpg"
    }
  ];

  return (
    <section id="nastar" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6">{t.products.title}</h2>
            <p className="text-brand-brown/60 text-lg leading-relaxed">
              {t.products.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-square mb-6 bg-white shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full p-8"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="absolute top-4 right-4 bg-brand-cream/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm shadow-sm">
                  {product.price}
                </div>
              </div>
              <h3 className="text-2xl mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
              <p className="text-brand-brown/60 text-sm leading-relaxed mb-4 line-clamp-2">{product.desc}</p>
              <a
                href="https://wa.me/6289676634475"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all hover:text-brand-gold"
              >
                {t.products.orderWA} <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StorySection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="our-story" className="py-24 px-6 bg-brand-cream relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none overflow-hidden flex items-center justify-center">
        <span className="text-[30vw] font-serif whitespace-nowrap">TRADITIONAL</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
              alt="Lucy Baking" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 aspect-square rounded-3xl overflow-hidden shadow-2xl -rotate-6 border-8 border-brand-cream hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1581339399838-2a120c18bba3?auto=format&fit=crop&q=80&w=800" 
              alt="Ingredients" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="inline-block px-4 py-1 rounded-full border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest">
            {t.story.badge}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl leading-tight">{t.story.title}</h2>
          <p className="text-lg text-brand-brown/70 leading-relaxed">
            {t.story.description}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <div className="text-4xl font-serif text-brand-gold mb-2">{t.story.stat1}</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">{t.story.stat1Label}</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-brand-gold mb-2">{t.story.stat2}</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">{t.story.stat2Label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="contact" className="py-24 px-6 bg-brand-brown text-brand-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-7xl mb-8 md:mb-12 text-center">{t.contact.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-brand-cream/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-brand-gold" />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">{t.contact.kitchen}</h4>
              <p className="text-xl font-serif whitespace-pre-line">{t.contact.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-brand-cream/10 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-brand-gold" />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">{t.contact.phone}</h4>
              <a href="https://wa.me/6289676634475" target="_blank" rel="noopener noreferrer" className="text-xl font-serif hover:text-brand-gold transition-colors">{t.contact.phoneNumber}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const t = translations[lang];
  const reviews = lang === 'id'
    ? [
        {
          text: 'Nastar terbaik yang pernah saya makan di luar dapur nenek saya sendiri. Teksturnya benar-benar sempurna.',
          author: 'Rina A., Jakarta'
        },
        {
          text: 'Kastengelnya gurih, renyah, dan wangi kejunya premium banget. Selalu jadi favorit keluarga.',
          author: 'Dewi P., Bandung'
        },
        {
          text: 'Putri Saljunya lembut dan manisnya pas, tidak berlebihan. Packaging juga cantik untuk hampers.',
          author: 'Nadia K., Surabaya'
        }
      ]
    : [
        {
          text: 'The best Nastar I have ever had outside my grandmother\'s kitchen. The texture is truly perfect.',
          author: 'Rina A., Jakarta'
        },
        {
          text: 'The kastengel is savory, crunchy, and has a rich premium cheese aroma. Family favorite every time.',
          author: 'Dewi P., Bandung'
        },
        {
          text: 'The Putri Salju is soft with balanced sweetness. Beautiful packaging too, perfect for gifting.',
          author: 'Nadia K., Surabaya'
        }
      ];

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background Accents */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center lg:text-left"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block text-brand-gold font-bold uppercase tracking-[0.3em] text-sm mb-6"
            >
              {t.hero.subtitle}
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.9] mb-8">
              {t.hero.title1} <br />
              <span className="italic text-brand-gold">{t.hero.title2}</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-brown/70 max-w-lg mb-12 mx-auto lg:mx-0 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <motion.a
                href="https://wa.me/6289676634475"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-brown text-brand-cream px-10 py-5 rounded-full font-bold uppercase tracking-widest shadow-xl text-center"
              >
                {t.hero.shopNow}
              </motion.a>
              <motion.a
                href="#our-story"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-brand-brown px-10 py-5 rounded-full font-bold uppercase tracking-widest text-center"
              >
                {t.hero.ourStory}
              </motion.a>
            </div>
          </motion.div>

          <div className="flex justify-center items-center">
            <FloatingCookie />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-brand-brown" />
        </motion.div>
      </section>

      <StorySection lang={lang} />
      <ProductSection lang={lang} />

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 bg-brand-gold text-brand-brown">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-10 md:mb-14">
            {lang === 'id' ? 'Ulasan Pelanggan' : 'Customer Reviews'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-7 border border-white/60 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={18} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-6">"{review.text}"</p>
                <p className="text-sm font-bold uppercase tracking-wide opacity-70">{review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection lang={lang} />

      {/* Footer */}
      <footer className="py-12 px-6 bg-brand-brown border-t border-white/10 text-brand-cream/40 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-serif font-bold tracking-widest text-brand-cream">
            LUCY COOKIES
          </div>
          <div className="text-xs uppercase tracking-widest font-bold">
            {t.footer}
          </div>
          <div className="flex gap-8">
            <Heart size={20} className="hover:text-brand-gold cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
